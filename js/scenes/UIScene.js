class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
    this.isTyping = false;
    this.fullText = '';
    this.typewriterTimer = null;
    this.currentSceneData = null;
    this.hpIcons = [];
    this.isChapterTitleShowing = false;
  }

  create() {
    const W = this.game.config.width;
    const H = this.game.config.height;

    // ── Dialogue box (bottom 35%) ──────────────────────────────
    const boxH = Math.floor(H * 0.35);
    const boxY = H - boxH;
    const pad = 14;

    this.dialogueContainer = this.add.container(0, 0).setDepth(10).setAlpha(0);

    const dlgBg = this.add.rectangle(W / 2, boxY + boxH / 2, W - 16, boxH, 0x10071e, 0.91);
    dlgBg.setStrokeStyle(2, 0x7b2fbe);
    this.dialogueContainer.add(dlgBg);

    // Speaker name plate
    this.speakerBg = this.add.rectangle(pad + 60, boxY + 14, 130, 22, 0x7b2fbe, 0.95).setOrigin(0.5, 0.5);
    this.dialogueContainer.add(this.speakerBg);

    this.speakerText = this.add.text(pad + 60, boxY + 14, '', {
      fontFamily: '"Press Start 2P", monospace', fontSize: '10px', color: '#ffffff'
    }).setOrigin(0.5, 0.5);
    this.speakerText.setShadow(1, 1, 'rgba(0,0,0,0.8)', 0);
    this.dialogueContainer.add(this.speakerText);

    // Dialogue body
    this.dialogueText = this.add.text(pad, boxY + 34, '', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '12px',
      color: '#dde0ff',
      wordWrap: { width: W - pad * 2 - 4 },
      lineSpacing: 7
    });
    this.dialogueText.setShadow(1, 1, 'rgba(0,0,0,0.8)', 0);
    this.dialogueContainer.add(this.dialogueText);

    // Advance hint
    this.hintText = this.add.text(W - pad, H - 10, '▼', {
      fontFamily: '"Press Start 2P", monospace', fontSize: '9px', color: '#9b59b6'
    }).setOrigin(1, 1).setAlpha(0);
    this.dialogueContainer.add(this.hintText);

    this.hintTween = this.tweens.add({
      targets: this.hintText, alpha: { from: 0.3, to: 1 },
      duration: 550, yoyo: true, repeat: -1, paused: true
    });

    // ── Choice buttons container ──────────────────────────────
    this.choiceContainer = this.add.container(0, 0).setDepth(15).setAlpha(0);

    // ── Top-left HP display ───────────────────────────────────
    this.hpContainer = this.add.container(10, 10).setDepth(20);

    // ── Top-right Inventory button ────────────────────────────
    this.invBtn = this.add.container(W - 10, 10).setDepth(20);
    const invBg = this.add.rectangle(0, 0, 108, 26, 0x7b2fbe, 0.88).setOrigin(1, 0).setStrokeStyle(1, 0xc084fc);
    this.invLabel = this.add.text(-54, 13, '🎒 Предметы', {
      fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#fff'
    }).setOrigin(0.5, 0.5);
    this.invBtn.add([invBg, this.invLabel]);
    invBg.setInteractive({ useHandCursor: true });
    invBg.on('pointerdown', () => this._showInventory());
    invBg.on('pointerover', () => invBg.setFillStyle(0x9b3aed, 1));
    invBg.on('pointerout', () => invBg.setFillStyle(0x7b2fbe, 0.88));

    // ── Chapter title overlay ─────────────────────────────────
    this.chapterOverlay = this.add.container(W / 2, H / 2).setDepth(50).setAlpha(0);
    this.chapterOverlay.add(this.add.rectangle(0, 0, W, H, 0x000000, 0.75));
    this.chapterNum = this.add.text(0, -25, '', {
      fontFamily: '"Press Start 2P", monospace', fontSize: '10px', color: '#9b59b6', align: 'center'
    }).setOrigin(0.5, 0.5);
    this.chapterNum.setShadow(1, 1, 'rgba(0,0,0,0.8)', 0);
    this.chapterTitleText = this.add.text(0, 15, '', {
      fontFamily: '"Press Start 2P", monospace', fontSize: '16px', color: '#ffffff',
      align: 'center', wordWrap: { width: W - 60 }
    }).setOrigin(0.5, 0.5);
    this.chapterTitleText.setShadow(1, 1, 'rgba(0,0,0,0.8)', 0);
    this.chapterOverlay.add([this.chapterNum, this.chapterTitleText]);

    // ── Inventory modal (hidden) ──────────────────────────────
    this.inventoryModal = this.add.container(W / 2, H / 2).setDepth(60).setAlpha(0);
    const invModalBg = this.add.rectangle(0, 0, W - 30, H * 0.6, 0x10071e, 0.97).setStrokeStyle(2, 0x7b2fbe);
    this.inventoryModal.add(invModalBg);
    this.invItemsText = this.add.text(0, 0, '', {
      fontFamily: '"Press Start 2P", monospace', fontSize: '9px', color: '#dde0ff',
      align: 'center', wordWrap: { width: W - 70 }, lineSpacing: 10
    }).setOrigin(0.5, 0.5);
    this.inventoryModal.add(this.invItemsText);
    const closeBtn = this.add.text(0, H * 0.25, '[ Закрыть ]', {
      fontFamily: '"Press Start 2P", monospace', fontSize: '9px', color: '#9b59b6'
    }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => {
      this.tweens.add({ targets: this.inventoryModal, alpha: 0, duration: 200 });
    });
    this.inventoryModal.add(closeBtn);

    // ── Global tap/click to advance ───────────────────────────
    this.input.on('pointerdown', (ptr) => {
      if (this.inventoryModal.alpha > 0.5) return;
      if (this.choiceContainer.alpha > 0.5) return;
      if (this.isChapterTitleShowing) return;
      if (ptr.x > W - 120 && ptr.y < 45) return; // inventory button area

      if (this.isTyping) {
        this.skipTypewriter();
      } else if (this.dialogueContainer.alpha > 0.5 && !this.isTyping) {
        this.advanceDialogue();
      }
    });

    // ── Event bus ─────────────────────────────────────────────
    this.game.events.on('show-dialogue', (entry, sceneData) => this.showDialogue(entry, sceneData));
    this.game.events.on('show-choices', (choices, sceneId) => this.showChoices(choices, sceneId));
    this.game.events.on('chapter-changed', (ch) => this.showChapterTitle(ch));

    this.updateHP();
  }

  // ─── Speaker colours ─────────────────────────────────────────
  _speakerColor(name) {
    const map = {
      'Диана':           '#ff6b9d',
      'Сева':            '#6bb5ff',
      'Арсен Маркарян':  '#f4a460',
      'Виктор Голик':    '#7fff7f',
      'Свапна':          '#ffaadd',
      'Джотаро Куджо':   '#88ccff',
      'Дио':             '#ffd700',
      'Тролль':          '#aaffaa',
      'Шлюхидзе':        '#ff6688',
      'Протитутидзе':    '#ff4466',
      'Тёлкидзе':        '#cc88ff',
      'Свиток':          '#cccccc',
      '???':             '#aaaaaa'
    };
    return map[name] || '#c084fc';
  }

  // ─── Dialogue ────────────────────────────────────────────────
  showDialogue(entry, sceneData) {
    this.currentSceneData = sceneData;
    this._hideChoices();

    const isNarrator = entry.isNarrator;
    const isThought  = entry.isThought;
    const speaker    = entry.speaker || '';

    if (isNarrator || !speaker) {
      this.speakerBg.setAlpha(0);
      this.speakerText.setText('');
    } else {
      this.speakerBg.setAlpha(0.95);
      this.speakerText.setText(speaker).setColor(this._speakerColor(speaker));
    }

    if (isThought) {
      this.dialogueText.setColor('#aabbcc');
      this.fullText = `« ${entry.text} »`;
    } else if (isNarrator) {
      this.dialogueText.setColor('#999ab8');
      this.fullText = entry.text;
    } else {
      this.dialogueText.setColor('#dde0ff');
      this.fullText = entry.text;
    }

    this.dialogueContainer.setAlpha(1);
    this.dialogueText.setText('');
    this.hintText.setAlpha(0);
    this.hintTween.pause();
    this.startTypewriter();
  }

  startTypewriter() {
    this.isTyping = true;
    let i = 0;
    if (this.typewriterTimer) this.typewriterTimer.remove();
    this.typewriterTimer = this.time.addEvent({
      delay: 30,
      repeat: this.fullText.length - 1,
      callback: () => {
        i++;
        this.dialogueText.setText(this.fullText.substring(0, i));
        if (i >= this.fullText.length) this._finishTypewriter();
      }
    });
  }

  skipTypewriter() {
    if (this.typewriterTimer) this.typewriterTimer.remove();
    this.dialogueText.setText(this.fullText);
    this._finishTypewriter();
  }

  _finishTypewriter() {
    this.isTyping = false;
    this.hintText.setAlpha(0.5);
    this.hintTween.resume();
  }

  advanceDialogue() {
    if (!this.currentSceneData) return;
    const sceneData = this.currentSceneData;
    const gameState = this.registry.get('gameState') || {};
    const nextIdx = (gameState.dialogueIndex || 0) + 1;
    gameState.dialogueIndex = nextIdx;
    this.registry.set('gameState', gameState);

    if (sceneData.dialogue && nextIdx < sceneData.dialogue.length) {
      this.showDialogue(sceneData.dialogue[nextIdx], sceneData);
      return;
    }

    // Dialogue done
    this.dialogueContainer.setAlpha(0);

    if (sceneData.choices && sceneData.choices.length > 0) {
      // Special free-text for riddle 3
      if (sceneData.id === 'ch4_riddle3') {
        this._freeTextRiddle();
        return;
      }
      this.showChoices(sceneData.choices, sceneData.id);
    } else if (sceneData.next) {
      this.game.events.emit('scene-changed', sceneData.next);
    }
  }

  _freeTextRiddle() {
    const answer = prompt('Что для тебя Сева? (напиши своими словами)') || '';
    // Save answer as flag
    const gs = this.registry.get('gameState') || {};
    gs.flags = gs.flags || {};
    gs.flags.riddle3_answer = answer;
    gs.flags.riddle3_correct = true;
    this.registry.set('gameState', gs);
    // Always pass — love has no wrong answer
    this.game.events.emit('scene-changed', 'ch4_riddle3_pass');
  }

  // ─── Choices ─────────────────────────────────────────────────
  showChoices(choices, sceneId) {
    this.dialogueContainer.setAlpha(0);
    this.choiceContainer.removeAll(true);
    this.choiceContainer.ignoreInput = false;

    const W = this.game.config.width;
    const H = this.game.config.height;
    const btnH = 50;
    const gap = 8;
    const totalH = choices.length * (btnH + gap) - gap;
    const startY = H - 30 - totalH;

    const isRiddle = choices.some(c => c.emoji === '✅' || c.emoji === '❌');

    choices.forEach((choice, i) => {
      const y = startY + i * (btnH + gap) + btnH / 2;
      const btn = this._makeChoiceBtn(choice, i, W, y, btnH, isRiddle);
      this.choiceContainer.add(btn);
    });

    this.choiceContainer.setAlpha(1);
  }

  _makeChoiceBtn(choice, index, W, y, btnH, isRiddle) {
    const cont = this.add.container(W / 2, y);

    // Gradient-like bg using two stacked rects
    const bgOuter = this.add.rectangle(0, 0, W - 40, btnH, 0x3b0d6e, 0.95).setStrokeStyle(2, 0xc084fc);
    const bgInner = this.add.rectangle(0, 0, W - 44, btnH - 4, 0x6b21a8, 0.7);
    bgOuter.setInteractive({ useHandCursor: true });
    
    const labelText = isRiddle ? choice.text : `${choice.emoji || ''}  ${choice.text}`;

    const label = this.add.text(0, 0, labelText, {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '11px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: W - 80 }
    }).setOrigin(0.5, 0.5);
    label.setShadow(1, 1, 'rgba(0,0,0,0.8)', 0);
    
    if (isRiddle) {
        cont.riddleEmoji = choice.emoji;
        cont.label = label;
    }

    bgOuter.on('pointerover', () => { bgOuter.setFillStyle(0x7c3aed, 1); bgInner.setFillStyle(0x9b3aed, 0.9); });
    bgOuter.on('pointerout', () => { bgOuter.setFillStyle(0x3b0d6e, 0.95); bgInner.setFillStyle(0x6b21a8, 0.7); });
    bgOuter.on('pointerdown', () => {
      if (this.choiceContainer.ignoreInput) return;
      if (isRiddle) {
          this.choiceContainer.ignoreInput = true;
          this.choiceContainer.each(childCont => {
              if (childCont.riddleEmoji && childCont.label) {
                  childCont.label.setText(`${childCont.riddleEmoji}  ${childCont.label.text}`);
              }
          });
          this.time.delayedCall(1500, () => {
              this.choiceContainer.ignoreInput = false;
              this._applyEffects(choice.effects);
              this._hideChoices();
              if (choice.nextScene) this.game.events.emit('scene-changed', choice.nextScene);
          });
      } else {
          this._applyEffects(choice.effects);
          this._hideChoices();
          if (choice.nextScene) this.game.events.emit('scene-changed', choice.nextScene);
      }
    });

    cont.add([bgOuter, bgInner, label]);

    // Entrance animation
    cont.setAlpha(0).setY(cont.y + 20);
    this.tweens.add({ targets: cont, alpha: 1, y: cont.y - 20, duration: 280, delay: index * 90, ease: 'Power2' });

    return cont;
  }

  _hideChoices() {
    if (this.choiceContainer.alpha === 0) return;
    this.tweens.add({
      targets: this.choiceContainer, alpha: 0, duration: 180,
      onComplete: () => this.choiceContainer.removeAll(true)
    });
  }

  _applyEffects(effects) {
    if (!effects) return;
    const gs = this.registry.get('gameState') || {};
    gs.flags = gs.flags || {};
    gs.inventory = gs.inventory || [];

    if (effects.courage)  gs.courage = (gs.courage || 0) + effects.courage;
    if (effects.hp)       gs.hp = Math.max(0, Math.min(gs.maxHp || 3, (gs.hp || 3) + effects.hp));
    if (effects.addItem && !gs.inventory.includes(effects.addItem)) gs.inventory.push(effects.addItem);
    if (effects.setFlag)  gs.flags[effects.setFlag] = true;

    this.registry.set('gameState', gs);

    // Persist
    try { localStorage.setItem('diana-save', JSON.stringify(gs)); } catch (e) {}

    this.updateHP();
    this._updateInvLabel();
  }

  // ─── HP display ──────────────────────────────────────────────
  updateHP() {
    this.hpIcons.forEach(i => i.destroy());
    this.hpIcons = [];
    const gs = this.registry.get('gameState') || {};
    const hp = gs.hp !== undefined ? gs.hp : 3;
    const maxHp = gs.maxHp || 3;
    const courage = gs.courage || 0;

    for (let i = 0; i < maxHp; i++) {
      const h = this.add.text(i * 18, 0, i < hp ? '❤️' : '🖤', {
        fontFamily: '"Press Start 2P", monospace', fontSize: '11px'
      });
      this.hpContainer.add(h);
      this.hpIcons.push(h);
    }

    if (courage > 0) {
      const c = this.add.text(0, 20, `⚡×${courage}`, {
        fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#ffcc44'
      });
      this.hpContainer.add(c);
      this.hpIcons.push(c);
    }
  }

  _updateInvLabel() {
    const gs = this.registry.get('gameState') || {};
    const n = (gs.inventory || []).length;
    this.invLabel.setText(`🎒 Предметы${n > 0 ? ` (${n})` : ''}`);
  }

  _showInventory() {
    const gs = this.registry.get('gameState') || {};
    const inv = gs.inventory || [];
    const lines = inv.length
      ? ['── Инвентарь ──', '', ...inv.map(it => `• ${it}`)]
      : ['── Пусто ──'];
    this.invItemsText.setText(lines.join('\n'));
    this.tweens.add({ targets: this.inventoryModal, alpha: 1, duration: 250 });
  }

  // ─── Chapter title ────────────────────────────────────────────
  showChapterTitle(chKey) {
    const title = GAME_DATA.chapterTitles[chKey] || chKey;
    const num = String(chKey).replace(/^ch/, '');
    this.chapterNum.setText(`── ГЛАВА ${num} ──`);
    this.chapterTitleText.setText(title);
    this.chapterOverlay.setAlpha(0);
    this.isChapterTitleShowing = true;
    this.tweens.add({
      targets: this.chapterOverlay, alpha: 1, duration: 700, ease: 'Power2',
      hold: 2200, yoyo: true,
      onComplete: () => {
        this.chapterOverlay.setAlpha(0);
        this.isChapterTitleShowing = false;
      }
    });
  }
}
