class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.characterSprites = [];
    this.particleEmitters = [];
    this.currentBg = null;
    this.isTransitioning = false;
  }

  create() {
    const W = this.game.config.width;
    const H = this.game.config.height;

    // Background image (fills screen) — start with cottage
    this.bgImage = this.add.image(W / 2, H / 2, 'bg-cottage');
    this.bgImage.setDisplaySize(W, H);

    // Character container
    this.characterContainer = this.add.container(0, 0);

    // Particle container (above bg, below characters)
    this.particleContainer = this.add.container(0, 0);

    // Fade overlay for transitions
    this.fadeOverlay = this.add.rectangle(W / 2, H / 2, W, H, 0x000000);
    this.fadeOverlay.setAlpha(0);
    this.fadeOverlay.setDepth(100);

    // Listen for game events
    this.game.events.on('scene-changed', (sceneId) => {
      this.loadScene(sceneId);
    });

    this.game.events.on('character-enter', (charArray) => {
      this.showCharacters(charArray);
    });

    // Initialize gameState and load first scene
    let gameState = this.registry.get('gameState');
    if (!gameState) {
      gameState = window.createGameState ? window.createGameState() : { currentScene: 'ch1_s1', dialogueIndex: 0, chapter: 1, inventory: [], courage: 0, hp: 3, maxHp: 3, flags: {} };
      this.registry.set('gameState', gameState);
    }
    this.loadScene(gameState.currentScene || 'ch1_s1');
  }

  loadScene(sceneId, instant = false) {
    if (this.isTransitioning) return;

    const sceneData = GAME_DATA.scenes[sceneId];
    if (!sceneData) return;

    const gameState = this.registry.get('gameState') || {};

    // Update registry
    gameState.currentScene = sceneId;
    gameState.dialogueIndex = 0;
    this.registry.set('gameState', gameState);

    // Check for chapter change
    if (sceneData.chapter && sceneData.chapter !== gameState.chapter) {
      gameState.chapter = sceneData.chapter;
      this.registry.set('gameState', gameState);
      this.game.events.emit('chapter-changed', sceneData.chapter);
    }

    if (instant) {
      this.showBackground(sceneData.bg);
      this.showCharacters(sceneData.characters || []);
      this.startDialogue(sceneData);
    } else {
      this.transitionToScene(sceneId);
    }
  }

  transitionToScene(nextSceneId) {
    this.isTransitioning = true;
    const W = this.game.config.width;
    const H = this.game.config.height;

    // Clear current content
    this.clearCharacters();
    this.clearParticles();

    // Fade to black
    this.tweens.add({
      targets: this.fadeOverlay,
      alpha: 1,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        const sceneData = GAME_DATA.scenes[nextSceneId];
        if (!sceneData) {
          this.isTransitioning = false;
          return;
        }

        this.showBackground(sceneData.bg);
        this.showCharacters(sceneData.characters || []);

        // Fade from black
        this.tweens.add({
          targets: this.fadeOverlay,
          alpha: 0,
          duration: 600,
          ease: 'Power2',
          onComplete: () => {
            this.isTransitioning = false;
            this.startDialogue(sceneData);
          }
        });
      }
    });
  }

  showBackground(bgKey) {
    const W = this.game.config.width;
    const H = this.game.config.height;

    // Map background keys to texture names
    const bgMap = {
      forest: 'bg_forest',
      cottage: 'bg_cottage',
      village: 'bg_village',
      market: 'bg_market',
      cave: 'bg_cave',
      river: 'bg_river',
      tower: 'bg_tower',
      garden: 'bg_garden',
      night: 'bg_night',
      default: 'bg_default'
    };

    const textureKey = bgMap[bgKey] || bgMap.default;

    // Check if texture exists, fallback to default
    if (this.textures.exists(textureKey)) {
      this.bgImage.setTexture(textureKey);
    } else {
      this.bgImage.setTexture('bg_default');
    }
    this.bgImage.setDisplaySize(W, H);

    // Clear old particles and add new ones
    this.clearParticles();
    this.addParticles(bgKey);
  }

  addParticles(type) {
    const W = this.game.config.width;
    const H = this.game.config.height;

    const particleConfigs = {
      forest: {
        texture: 'particle_glow',
        count: 15,
        color: 0x88ff88,
        speed: { min: 10, max: 30 },
        scale: { start: 0.5, end: 0 },
        lifespan: 4000,
        frequency: 300,
        zone: { x: 0, y: 0, w: W, h: H * 0.7 }
      },
      cottage: {
        texture: 'particle_spark',
        count: 8,
        color: 0xffaa44,
        speed: { min: 20, max: 50 },
        scale: { start: 0.4, end: 0 },
        lifespan: 2000,
        frequency: 400,
        zone: { x: W * 0.3, y: H * 0.3, w: W * 0.4, h: H * 0.2 }
      },
      night: {
        texture: 'particle_glow',
        count: 20,
        color: 0xaaddff,
        speed: { min: 5, max: 15 },
        scale: { start: 0.3, end: 0 },
        lifespan: 6000,
        frequency: 200,
        zone: { x: 0, y: 0, w: W, h: H * 0.6 }
      },
      cave: {
        texture: 'particle_dust',
        count: 10,
        color: 0x666666,
        speed: { min: 5, max: 20 },
        scale: { start: 0.3, end: 0 },
        lifespan: 5000,
        frequency: 500,
        zone: { x: 0, y: 0, w: W, h: H }
      },
      river: {
        texture: 'particle_spark',
        count: 12,
        color: 0x4488ff,
        speed: { min: 15, max: 40 },
        scale: { start: 0.3, end: 0 },
        lifespan: 3000,
        frequency: 250,
        zone: { x: 0, y: H * 0.5, w: W, h: H * 0.3 }
      },
      garden: {
        texture: 'particle_glow',
        count: 10,
        color: 0xff88cc,
        speed: { min: 8, max: 25 },
        scale: { start: 0.4, end: 0 },
        lifespan: 5000,
        frequency: 350,
        zone: { x: 0, y: 0, w: W, h: H * 0.7 }
      },
      market: {
        texture: 'particle_dust',
        count: 6,
        color: 0xccaa88,
        speed: { min: 10, max: 30 },
        scale: { start: 0.2, end: 0 },
        lifespan: 4000,
        frequency: 600,
        zone: { x: 0, y: H * 0.2, w: W, h: H * 0.4 }
      }
    };

    const config = particleConfigs[type];
    if (!config) return;

    // Create particles using Phaser 3 particle emitter
    const zone = config.zone;
    for (let i = 0; i < config.count; i++) {
      const x = zone.x + Math.random() * zone.w;
      const y = zone.y + Math.random() * zone.h;

      const particle = this.add.circle(x, y, 2 * config.scale.start, config.color);
      particle.setAlpha(0.6);
      this.particleContainer.add(particle);

      // Animate each particle
      this.tweens.add({
        targets: particle,
        y: y - 30 - Math.random() * 40,
        x: x + (Math.random() - 0.5) * 40,
        alpha: 0,
        scaleX: 0,
        scaleY: 0,
        duration: config.lifespan + Math.random() * 2000,
        ease: 'Power1',
        repeat: -1,
        repeatDelay: Math.random() * config.frequency,
        onRepeat: () => {
          particle.x = zone.x + Math.random() * zone.w;
          particle.y = zone.y + Math.random() * zone.h;
          particle.setAlpha(0.6);
          particle.setScale(config.scale.start);
        }
      });

      this.particleEmitters.push(particle);
    }
  }

  clearParticles() {
    this.particleEmitters.forEach(p => {
      this.tweens.killTweensOf(p);
      p.destroy();
    });
    this.particleEmitters = [];
  }

  showCharacters(charArray) {
    this.clearCharacters();

    if (!charArray || charArray.length === 0) return;

    const W = this.game.config.width;
    const H = this.game.config.height;

    charArray.forEach((charInfo, index) => {
      const charKey = typeof charInfo === 'string' ? charInfo : charInfo.id || charInfo;
      const emotion = typeof charInfo === 'object' ? (charInfo.emotion || 'neutral') : 'neutral';

      // Texture key: char_<name>_<emotion> or char_<name>
      let textureKey = `char_${charKey}_${emotion}`;
      if (!this.textures.exists(textureKey)) {
        textureKey = `char_${charKey}`;
      }
      if (!this.textures.exists(textureKey)) {
        textureKey = 'char_default';
      }

      // Position: spread characters evenly across bottom-center
      const totalChars = charArray.length;
      const spacing = Math.min(120, W / (totalChars + 1));
      const startX = W / 2 - (spacing * (totalChars - 1)) / 2;
      const x = startX + index * spacing;
      const targetY = H * 0.58;

      const sprite = this.add.image(x, targetY + 80, textureKey);
      sprite.setAlpha(0);
      sprite.setScale(0.9);
      sprite.setOrigin(0.5, 1);

      // Resize to fit
      const maxCharHeight = H * 0.45;
      if (sprite.height > maxCharHeight) {
        const scale = maxCharHeight / sprite.height;
        sprite.setScale(scale * 0.9);
      }

      this.characterContainer.add(sprite);
      this.characterSprites.push(sprite);

      // Enter animation: fade in + slide up
      this.tweens.add({
        targets: sprite,
        y: targetY,
        alpha: 1,
        duration: 600,
        delay: index * 150,
        ease: 'Back.easeOut'
      });

      // Idle bobbing animation
      this.tweens.add({
        targets: sprite,
        y: targetY - 4,
        duration: 2000 + Math.random() * 500,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        delay: 700 + index * 150
      });
    });
  }

  clearCharacters() {
    this.characterSprites.forEach(s => {
      this.tweens.killTweensOf(s);
      s.destroy();
    });
    this.characterSprites = [];
  }

  startDialogue(sceneData) {
    if (!sceneData) return;

    const gameState = this.registry.get('gameState') || {};

    if (sceneData.dialogue && sceneData.dialogue.length > 0) {
      const currentDialogue = sceneData.dialogue[gameState.dialogueIndex || 0];
      if (currentDialogue) {
        this.game.events.emit('show-dialogue', currentDialogue, sceneData);
      }
    } else if (sceneData.choices && sceneData.choices.length > 0) {
      this.game.events.emit('show-choices', sceneData.choices);
    } else if (sceneData.ending) {
      this.game.events.emit('show-ending', sceneData.ending, sceneData.id);
    } else if (sceneData.next) {
      // Auto-advance to next scene
      this.time.delayedCall(500, () => {
        this.loadScene(sceneData.next);
      });
    }
  }
}
