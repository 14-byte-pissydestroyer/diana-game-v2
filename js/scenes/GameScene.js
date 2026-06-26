class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.characterSprites = [];
    this.particleEmitters = [];
    this.isTransitioning = false;
  }

  create() {
    const W = this.game.config.width;
    const H = this.game.config.height;

    const saved = this._loadState();
    const initState = saved || {
      currentScene: 'ch1_opening',
      dialogueIndex: 0,
      chapter: 'ch1',
      inventory: [],
      flags: {},
      courage: 0,
      hp: 3,
      maxHp: 3
    };
    this.registry.set('gameState', initState);

    this.bgImage = this.add.image(W / 2, H / 2, 'bg-cottage');
    this.bgImage.setDisplaySize(W, H);

    this.particleContainer = this.add.container(0, 0);
    this.characterContainer = this.add.container(0, 0);

    this.fadeOverlay = this.add.rectangle(W / 2, H / 2, W, H, 0x000000);
    this.fadeOverlay.setAlpha(0);
    this.fadeOverlay.setDepth(100);

    this.scene.launch('UIScene');

    this.game.events.on('scene-changed', (sceneId) => {
      this.loadScene(sceneId);
    });

    this.time.delayedCall(120, () => {
      this.loadScene(initState.currentScene, true);
    });
  }

  _loadState() {
    try {
      const raw = localStorage.getItem('diana-save');
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  _saveState() {
    try {
      const gs = this.registry.get('gameState');
      if (gs) localStorage.setItem('diana-save', JSON.stringify(gs));
    } catch (e) {}
  }

  loadScene(sceneId, instant = false) {
    if (this.isTransitioning) return;
    const sceneData = GAME_DATA.scenes[sceneId];
    if (!sceneData) { console.warn('Unknown scene:', sceneId); return; }

    const gameState = this.registry.get('gameState') || {};
    gameState.currentScene = sceneId;
    gameState.dialogueIndex = 0;
    this.registry.set('gameState', gameState);
    this._saveState();

    if (sceneData.chapter && sceneData.chapter !== gameState.chapter) {
      gameState.chapter = sceneData.chapter;
      this.registry.set('gameState', gameState);
      this.game.events.emit('chapter-changed', sceneData.chapter);
    }

    if (instant) {
      this._applyScene(sceneData);
    } else {
      this.transitionToScene(sceneId);
    }
  }

  transitionToScene(nextSceneId) {
    this.isTransitioning = true;
    this.clearCharacters();
    this.clearParticles();

    this.tweens.add({
      targets: this.fadeOverlay,
      alpha: 1,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        const sceneData = GAME_DATA.scenes[nextSceneId];
        if (!sceneData) { this.isTransitioning = false; return; }
        this._applyScene(sceneData);
        this.tweens.add({
          targets: this.fadeOverlay,
          alpha: 0,
          duration: 600,
          ease: 'Power2',
          onComplete: () => { this.isTransitioning = false; }
        });
      }
    });
  }

  _applyScene(sceneData) {
    const W = this.game.config.width;
    const H = this.game.config.height;
    const bgKey = 'bg-' + sceneData.bg;
    this.bgImage.setTexture(this.textures.exists(bgKey) ? bgKey : 'bg-cottage');
    this.bgImage.setDisplaySize(W, H);
    this.clearParticles();
    this.addParticles(sceneData.bg);
    this.showCharacters(sceneData.characters || []);
    this.startDialogue(sceneData);
  }

  addParticles(bgType) {
    const W = this.game.config.width;
    const H = this.game.config.height;
    const cfgs = {
      cottage: { key: 'particle-fire',    count: 6,  color: 0xff8800, zone: [W*0.4, H*0.35, W*0.2, H*0.1] },
      forest:  { key: 'particle-leaf',    count: 12, color: 0x44ff44, zone: [0, 0, W, H*0.7] },
      tower:   { key: 'particle-code',    count: 10, color: 0x00ff44, zone: [0, 0, W, H] },
      garden:  { key: 'particle-sparkle', count: 10, color: 0xffffff, zone: [0, H*0.3, W, H*0.5] },
      sunrise: { key: 'particle-sparkle', count: 8,  color: 0xffdd44, zone: [0, 0, W, H*0.6] },
      bridge:  { key: 'particle-fire',    count: 4,  color: 0xff4400, zone: [0, H*0.2, W, H*0.3] },
      castle:  { key: 'particle-sparkle', count: 8,  color: 0xaa44ff, zone: [0, 0, W, H] },
      throne:  { key: 'particle-fire',    count: 6,  color: 0xff2200, zone: [0, H*0.1, W, H*0.5] }
    };
    const cfg = cfgs[bgType];
    if (!cfg || !this.textures.exists(cfg.key)) return;

    const [zx, zy, zw, zh] = cfg.zone;
    for (let i = 0; i < cfg.count; i++) {
      const x = zx + Math.random() * zw;
      const y = zy + Math.random() * zh;
      const p = this.add.image(x, y, cfg.key);
      p.setScale(0.4 + Math.random() * 0.5).setAlpha(0.7).setTint(cfg.color);
      this.particleContainer.add(p);
      this.particleEmitters.push(p);
      this.tweens.add({
        targets: p,
        y: y - 40 - Math.random() * 60,
        x: x + (Math.random() - 0.5) * 30,
        alpha: 0,
        duration: 2500 + Math.random() * 2000,
        ease: 'Power1',
        repeat: -1,
        repeatDelay: Math.random() * 1200,
        onRepeat: () => { p.x = zx + Math.random() * zw; p.y = zy + Math.random() * zh; p.setAlpha(0.7); }
      });
    }
  }

  clearParticles() {
    this.particleEmitters.forEach(p => { this.tweens.killTweensOf(p); p.destroy(); });
    this.particleEmitters = [];
  }

  showCharacters(charArray) {
    this.clearCharacters();
    if (!charArray || !charArray.length) return;
    const W = this.game.config.width;
    const H = this.game.config.height;

    charArray.forEach((charId, index) => {
      const key = 'char-' + charId;
      if (!this.textures.exists(key)) return;
      const total = charArray.length;
      const spacing = Math.min(140, W / (total + 1));
      const startX = W / 2 - (spacing * (total - 1)) / 2;
      const x = startX + index * spacing;
      const targetY = H * 0.62;

      const sprite = this.add.image(x, targetY + 80, key);
      sprite.setOrigin(0.5, 1).setAlpha(0);

      const maxH = H * 0.55;
      if (sprite.height > 0) {
        sprite.setScale(Math.min(maxH / sprite.height, 3));
      }

      this.characterContainer.add(sprite);
      this.characterSprites.push(sprite);

      this.tweens.add({ targets: sprite, y: targetY, alpha: 1, duration: 600, delay: index * 150, ease: 'Back.easeOut' });
      this.tweens.add({ targets: sprite, y: targetY - 5, duration: 2200 + Math.random() * 400, ease: 'Sine.easeInOut', yoyo: true, repeat: -1, delay: 800 + index * 150 });
    });
  }

  clearCharacters() {
    this.characterSprites.forEach(s => { this.tweens.killTweensOf(s); s.destroy(); });
    this.characterSprites = [];
  }

  startDialogue(sceneData) {
    if (!sceneData) return;
    const gameState = this.registry.get('gameState') || {};
    const idx = gameState.dialogueIndex || 0;

    if (sceneData.dialogue && idx < sceneData.dialogue.length) {
      this.game.events.emit('show-dialogue', sceneData.dialogue[idx], sceneData);
    } else if (sceneData.choices && sceneData.choices.length > 0) {
      this.game.events.emit('show-choices', sceneData.choices, sceneData.id);
    } else if (sceneData.next) {
      this.time.delayedCall(400, () => this.loadScene(sceneData.next));
    }
  }
}
