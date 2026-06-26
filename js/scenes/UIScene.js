class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
    this.dialogueBox = null;
    this.speakerText = null;
    this.dialogueText = null;
    this.hintText = null;
    this.choiceContainer = null;
    this.isTyping = false;
    this.fullText = '';
    this.typewriterTimer = null;
    this.currentSceneData = null;
    this.currentDialogueEntry = null;
  }

  create() {
    const W = this.game.config.width;
    const H = this.game.config.height;

    // === Dialogue Box (bottom 35%) ===
    const boxH = H * 0.35;
    const boxY = H - boxH / 2;
    const boxPad = 12;

    // Dialogue container (initially hidden)
    this.dialogueContainer = this.add.container(0, 0);
    this.dialogueContainer.setDepth(10);

    // Background
    this.dialogueBg = this.add.rectangle(W / 2, boxY, W - 20, boxH, 0x1a0a2e, 0.88);
    this.dialogueBg.setStrokeStyle(2, 0x9b59b6);
    this.dialogueContainer.add(this.dialogueBg);

    // Speaker name background
    this.speakerBg = this.add.rectangle(W / 2, H - boxH + 14, 140, 24, 0x9b59b6, 0.9);
    this.speakerBg.setOrigin(0.5, 0.5);
    this.dialogueContainer.add(this.speakerBg);

    // Speaker name text
    this.speakerText = this.add.text(W / 2, H - boxH + 14, '', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '10px',
      color: '#ffffff',
      align: 'center'
    });
    this.speakerText.setOrigin(0.5, 0.5);
    this.dialogueContainer.add(this.speakerText);

    // Dialogue text
    this.dialogueText = this.add.text(boxPad + 8, H - boxH + 36, '', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '12px',
      color: '#e0e0e0',
      wordWrap: { width: W - 40 },
      lineSpacing: 8
    });
    this.dialogueContainer.add(this.dialogueText);

    // "Нажми" hint
    this.hintText = this.add.text(W - boxPad - 12, H - 22, '▼ нажми', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '8px',
      color: '#9b59b6'
    });
    this.hintText.setOrigin(1, 1);
    this.hintText.setAlpha(0);
    this.dialogueContainer.add(this.hintText);

    // Blinking hint animation
    this.tweens.add({
      targets: this.hintText,
      alpha: { from: 0.4, to: 1 },
      duration: 600,
      yoyo: true,
      repeat: -1,
      pause: true
    });
    this.hintTween = this.tweens.getAllTweens().pop();

    this.dialogueContainer.setAlpha(0);

    // === Choice Buttons Container ===
    this.choiceContainer = this.add.container(0, 0);
    this.choiceContainer.setDepth(15);
    this.choiceContainer.setAlpha(0);

    // === HP / Hearts Display (top left) ===
    this.hpContainer = this.add.container(12, 12);
    this.hpContainer.setDepth(20);
    this.hpIcons = [];

    // === Inventory Button (top right) ===
    this.inventoryBtn = this.add.container(W - 12, 12);
    this.inventoryBtn.setDepth(20);

    const invBg = this.add.rectangle(0, 0, 110, 28, 0x9b59b6, 0.85);
    invBg.setOrigin(1, 0);
    invBg.setStrokeStyle(1, 0xc084fc);
    this.inventoryBtn.add(invBg);

    this.inventoryText = this.add.text(-55, 14, '🎒 Инвентарь', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '7px',
      color: '#ffffff'
    });
    this.inventoryText.setOrigin(0.5, 0.5);
    this.inventoryBtn.add(this.inventoryText);

    invBg.setInteractive({ useHandCursor: true });
    invBg.on('pointerdown', () => {
      this.game.events.emit('toggle-inventory');
    });

    // === Chapter Title Overlay ===
    this.chapterOverlay = this.add.container(W / 2, H / 2);
    this.chapterOverlay.setDepth(50);
    this.chapterOverlay.setAlpha(0);

    this.chapterBg = this.add.rectangle(0, 0, W, H, 0x000000, 0.7);
    this.chapterOverlay.add(this.chapterBg);

    this.chapterLabel = this.add.text(0, -20, '', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '10px',
      color: '#9b59b6',
      align: 'center'
    });
    this.chapterLabel.setOrigin(0.5, 0.5);
    this.chapterOverlay.add(this.chapterLabel);

    this.chapterTitle = this.add.text(0, 15, '', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '14px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: W - 60 }
    });
    this.chapterTitle.setOrigin(0.5, 0.5);
    this.chapterOverlay.add(this.chapterTitle);

    // === Click/Tap zone for advancing dialogue ===
    this.input.on('pointerdown', (pointer) => {
      // Ignore if pointer is on choice buttons or inventory
      if (this.choiceContainer.alpha > 0.5) return;
      if (this.isPointerOverInventory(pointer)) return;

      if (this.isTyping) {
        this.skipTypewriter();
      } else if (this.dialogueContainer.alpha > 0.5 && this.hintText.alpha > 0) {
        this.advanceDialogue();
      }
    });

    // === Event Listeners ===
    this.game.events.on('show-dialogue', (dialogueEntry, sceneData) => {
      this.showDialogue(dialogueEntry, sceneData);
    });

    this.game.events.on('show-choices', (choices) => {
      this.showChoices(choices);
    });

    this.game.events.on('advance-dialogue', () => {
      this.advanceDialogue();
    });

    this.game.events.on('chapter-changed', (chapter) => {
      this.showChapterTitle(chapter);
    });

    this.game.events.on('show-ending', (ending, sceneId) => {
      this.showEnding(ending, sceneId);
    });

    this.game.events.on('update-hp', () => {
      this.updateHP();
    });

    this.game.events.on('update-inventory', () => {
      this.updateInventoryDisplay();
    });

    // Initial HP display
    this.updateHP();
  }

  isPointerOverInventory(pointer) {
    const W = this.game.config.width;
    return pointer.x > W - 120 && pointer.y < 45;
  }

  // ─────────── Dialogue System ───────────

  showDialogue(dialogueEntry, sceneData) {
    this.currentDialogueEntry = dialogueEntry;
    this.currentSceneData = sceneData;

    // Hide choices if showing
    this.hideChoices();

    // Set speaker
    const speakerColors = {
      'Диана': '#ff6b9d',
      'Мама': '#ffaa44',
      'Папа': '#44aaff',
      'Бабушка': '#88cc88',
      'Миша': '#44ddff',
      'Кот': '#ffcc44',
      'Учитель': '#cc88ff',
      'Narrator': '#999999'
    };

    const speaker = dialogueEntry.speaker || '';
    const isNarrator = dialogueEntry.isNarrator;
    const isThought = dialogueEntry.isThought;

    if (isNarrator) {
      this.speakerBg.setAlpha(0);
      this.speakerText.setText('');
    } else {
      this.speakerBg.setAlpha(0.9);
      const color = speakerColors[speaker] || '#c084fc';
      this.speakerText.setText(speaker);
      this.speakerText.setColor(color);
    }

    // Style text differently for thoughts
    if (isThought) {
      this.dialogueText.setColor('#aabbcc');
      this.fullText = `« ${dialogueEntry.text} »`;
    } else {
      this.dialogueText.setColor('#e0e0e0');
      this.fullText = dialogueEntry.text;
    }

    // Show dialogue box
    this.dialogueContainer.setAlpha(1);
    this.dialogueText.setText('');
    this.hintText.setAlpha(0);
    this.hintTween.pause();

    // Start typewriter
    this.startTypewriter();
  }

  startTypewriter() {
    this.isTyping = true;
    let charIndex = 0;
    const speed = 35; // ms per character

    if (this.typewriterTimer) {
      this.typewriterTimer.remove();
    }

    this.typewriterTimer = this.time.addEvent({
      delay: speed,
      callback: () => {
        charIndex++;
        this.dialogueText.setText(this.fullText.substring(0, charIndex));

        if (charIndex >= this.fullText.length) {
          this.finishTypewriter();
        }
      },
      repeat: this.fullText.length - 1
    });
  }

  skipTypewriter() {
    if (this.typewriterTimer) {
      this.typewriterTimer.remove();
    }
    this.dialogueText.setText(this.fullText);
    this.finishTypewriter();
  }

  finishTypewriter() {
    this.isTyping = false;
    this.hintText.setAlpha(0.5);
    this.hintTween.resume();
  }

  advanceDialogue() {
    if (!this.currentSceneData) return;

    const sceneData = this.currentSceneData;
    const gameState = this.registry.get('gameState') || {};
    const dialogueIndex = (gameState.dialogueIndex || 0) + 1;

    gameState.dialogueIndex = dialogueIndex;
    this.registry.set('gameState', gameState);

    // More dialogue in this scene?
    if (sceneData.dialogue && dialogueIndex < sceneData.dialogue.length) {
      this.showDialogue(sceneData.dialogue[dialogueIndex], sceneData);
      return;
    }

    // Done with dialogue — show choices or advance
    this.dialogueContainer.setAlpha(0);
    this.hintText.setAlpha(0);

    if (sceneData.choices && sceneData.choices.length > 0) {
      this.showChoices(sceneData.choices);
    } else if (sceneData.ending) {
      this.game.events.emit('show-ending', sceneData.ending, sceneData.id);
    } else if (sceneData.next) {
      this.game.events.emit('scene-changed', sceneData.next);
    }
  }

  hideDialogue() {
    this.dialogueContainer.setAlpha(0);
    this.hintText.setAlpha(0);
  }

  // ─────────── Choice System ───────────

  showChoices(choices) {
    this.hideDialogue();
    this.choiceContainer.removeAll(true);

    const W = this.game.config.width;
    const H = this.game.config.height;
    const btnH = 48;
    const gap = 10;
    const totalH = choices.length * (btnH + gap) - gap;
    const startY = H - 40 - totalH;

    choices.forEach((choice, index) => {
      const y = startY + index * (btnH + gap);
      const btn = this.createChoiceButton(choice, index, W, y, btnH);
      this.choiceContainer.add(btn);
    });

    // Animate container in
    this.choiceContainer.setAlpha(1);
    this.choiceContainer.setY(30);
    this.tweens.add({
      targets: this.choiceContainer,
      y: 0,
      duration: 400,
      ease: 'Back.easeOut'
    });
  }

  createChoiceButton(choice, index, W, y, btnH) {
    const container = this.add.container(W / 2, y);

    const bg = this.add.rectangle(0, 0, W - 50, btnH, 0x6b21a8, 0.9);
    bg.setStrokeStyle(2, 0xc084fc);
    bg.setOrigin(0.5, 0.5);
    bg.setInteractive({ useHandCursor: true });
    container.add(bg);

    // Hover effect
    bg.on('pointerover', () => {
      bg.setFillStyle(0x7c3aed, 1);
    });
    bg.on('pointerout', () => {
      bg.setFillStyle(0x6b21a8, 0.9);
    });

    const emoji = choice.emoji || '';
    const label = `${emoji}  ${choice.text}`;
    const text = this.add.text(0, 0, label, {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '11px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: W - 80 }
    });
    text.setOrigin(0.5, 0.5);
    container.add(text);

    bg.on('pointerdown', () => {
      // Apply effects
      this.applyChoiceEffects(choice.effects);

      // Hide choices
      this.hideChoices();

      // Emit choice event
      this.game.events.emit('choice-made', index, choice);

      // Go to next scene
      if (choice.nextScene) {
        this.game.events.emit('scene-changed', choice.nextScene);
      }
    });

    // Entrance animation
    container.setAlpha(0);
    container.setY(container.y + 20);
    this.tweens.add({
      targets: container,
      alpha: 1,
      y: container.y - 20,
      duration: 300,
      delay: index * 100,
      ease: 'Power2'
    });

    return container;
  }

  hideChoices() {
    this.tweens.add({
      targets: this.choiceContainer,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        this.choiceContainer.removeAll(true);
      }
    });
  }

  applyChoiceEffects(effects) {
    if (!effects) return;
    const gameState = this.registry.get('gameState') || {};

    if (effects.courage !== undefined) {
      gameState.courage = (gameState.courage || 0) + effects.courage;
    }
    if (effects.hp !== undefined) {
      gameState.hp = Math.min(gameState.maxHp || 100, (gameState.hp || 100) + effects.hp);
    }
    if (effects.item) {
      if (!gameState.inventory) gameState.inventory = [];
      if (!gameState.inventory.includes(effects.item)) {
        gameState.inventory.push(effects.item);
      }
    }

    this.registry.set('gameState', gameState);
    this.updateHP();
  }

  // ─────────── HP Display ───────────

  updateHP() {
    const gameState = this.registry.get('gameState') || {};
    const hp = gameState.hp !== undefined ? gameState.hp : 100;
    const maxHp = gameState.maxHp || 100;

    // Clear old icons
    this.hpIcons.forEach(icon => icon.destroy());
    this.hpIcons = [];

    const maxHearts = 5;
    const hearts = Math.ceil((hp / maxHp) * maxHearts);

    // Label
    const label = this.add.text(0, 0, '❤️', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '10px',
      color: '#ff4444'
    });
    this.hpContainer.add(label);
    this.hpIcons.push(label);

    for (let i = 0; i < maxHearts; i++) {
      const heart = this.add.text(20 + i * 18, 0, i < hearts ? '♥' : '♡', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '10px',
        color: i < hearts ? '#ff4444' : '#666666'
      });
      this.hpContainer.add(heart);
      this.hpIcons.push(heart);
    }

    // Courage display
    const courage = gameState.courage || 0;
    const courageText = this.add.text(0, 18, `⚡ ${courage}`, {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '8px',
      color: '#ffcc44'
    });
    this.hpContainer.add(courageText);
    this.hpIcons.push(courageText);
  }

  // ─────────── Inventory Display ───────────

  updateInventoryDisplay() {
    const gameState = this.registry.get('gameState') || {};
    const count = (gameState.inventory || []).length;
    this.inventoryText.setText(`🎒 Инвентарь (${count})`);
  }

  // ─────────── Chapter Title Overlay ───────────

  showChapterTitle(chapter) {
    const title = GAME_DATA.chapterTitles[chapter] || `Глава ${chapter}`;

    this.chapterLabel.setText(`— ГЛАВА ${chapter} —`);
    this.chapterTitle.setText(title);

    this.chapterOverlay.setAlpha(0);
    this.tweens.add({
      targets: this.chapterOverlay,
      alpha: 1,
      duration: 800,
      ease: 'Power2',
      hold: 2000,
      yoyo: true,
      onComplete: () => {
        this.chapterOverlay.setAlpha(0);
      }
    });
  }

  // ─────────── Ending Screen ───────────

  showEnding(ending, sceneId) {
    this.hideDialogue();
    this.hideChoices();

    const W = this.game.config.width;
    const H = this.game.config.height;

    const overlay = this.add.container(W / 2, H / 2);
    overlay.setDepth(100);

    const bg = this.add.rectangle(0, 0, W, H, 0x000000, 0.85);
    overlay.add(bg);

    const titleColors = { bad: '#ff4444', medium: '#ffaa44', best: '#44ff88' };
    const endingType = ending.type || 'medium';

    const title = this.add.text(0, -60, ending.title || 'Конец', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '16px',
      color: titleColors[endingType] || '#ffffff',
      align: 'center'
    });
    title.setOrigin(0.5, 0.5);
    overlay.add(title);

    const desc = this.add.text(0, 10, ending.text || '', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '10px',
      color: '#cccccc',
      align: 'center',
      wordWrap: { width: W - 60 },
      lineSpacing: 6
    });
    desc.setOrigin(0.5, 0.5);
    overlay.add(desc);

    // Restart button
    const btnBg = this.add.rectangle(0, 100, 180, 40, 0x9b59b6, 0.9);
    btnBg.setStrokeStyle(2, 0xc084fc);
    btnBg.setInteractive({ useHandCursor: true });
    overlay.add(btnBg);

    const btnText = this.add.text(0, 100, '🔄 Заново', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '10px',
      color: '#ffffff'
    });
    btnText.setOrigin(0.5, 0.5);
    overlay.add(btnText);

    btnBg.on('pointerdown', () => {
      this.registry.set('gameState', {
        currentScene: 'scene_1_1',
        dialogueIndex: 0,
        chapter: 1,
        inventory: [],
        courage: 0,
        hp: 100,
        maxHp: 100
      });
      this.game.events.emit('scene-changed', 'scene_1_1');
      overlay.destroy();
    });

    // Fade in
    overlay.setAlpha(0);
    this.tweens.add({
      targets: overlay,
      alpha: 1,
      duration: 1000,
      ease: 'Power2'
    });
  }
}
