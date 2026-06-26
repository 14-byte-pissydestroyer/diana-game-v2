class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    create() {
        const W = this.game.config.width;
        const H = this.game.config.height;

        // Loading bar
        const barBg = this.add.rectangle(W / 2, H / 2, 300, 24, 0x222244);
        const barFg = this.add.rectangle(W / 2 - 148, H / 2, 4, 20, 0x00ff88).setOrigin(0, 0.5);
        const loadText = this.add.text(W / 2, H / 2 - 30, 'Generating textures...', {
            fontSize: '14px', fill: '#aaccff', fontFamily: 'monospace'
        }).setOrigin(0.5);

        this.time.delayedCall(50, () => {
            const tasks = [
                () => this.genBgCottage(W, H),
                () => this.genBgForest(W, H),
                () => this.genBgTower(W, H),
                () => this.genBgBridge(W, H),
                () => this.genBgCastle(W, H),
                () => this.genBgThrone(W, H),
                () => this.genBgSunrise(W, H),
                () => this.genBgGarden(W, H),
                () => this.genCharacters(),
                () => this.genParticles()
            ];

            const total = tasks.length;
            tasks.forEach((fn, i) => {
                fn();
                barFg.width = ((i + 1) / total) * 296;
            });

            barFg.width = 296;
            loadText.setText('Done!');

            this.time.delayedCall(300, () => {
                this.scene.start('GameScene');
            });
        });
    }

    createCanvasTexture(key, w, h, drawFn) {
        const canvas = this.textures.createCanvas(key, w, h);
        const ctx = canvas.context;
        drawFn(ctx, w, h);
        canvas.refresh();
        return canvas;
    }

    // ── Backgrounds ──────────────────────────────────────────────

    genBgCottage(W, H) {
        this.createCanvasTexture('bg-cottage', W, H, (ctx, w, h) => {
            // Base wall
            ctx.fillStyle = '#2a1a3a';
            ctx.fillRect(0, 0, w, h);

            // Stone wall texture
            ctx.fillStyle = '#3a2a4a';
            for (let y = 0; y < h * 0.65; y += 20) {
                const off = (Math.floor(y / 20) % 2) * 20;
                for (let x = off; x < w; x += 40) {
                    ctx.fillRect(x + 1, y + 1, 38, 18);
                    ctx.strokeStyle = '#1a0a2a';
                    ctx.strokeRect(x, y, 40, 20);
                }
            }

            // Floor planks
            ctx.fillStyle = '#5a3a1a';
            ctx.fillRect(0, h * 0.65, w, h * 0.35);
            for (let y = h * 0.65; y < h; y += 16) {
                ctx.strokeStyle = '#3a2a0a';
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
                const off = (Math.floor((y - h * 0.65) / 16) % 2) * 60;
                for (let x = off; x < w; x += 120) {
                    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 16); ctx.stroke();
                }
            }

            // Bookshelf
            const bsX = 20, bsY = 80, bsW = 100, bsH = 250;
            ctx.fillStyle = '#4a2a0a';
            ctx.fillRect(bsX, bsY, bsW, bsH);
            const bookColors = ['#cc3333', '#3333cc', '#33aa33', '#cccc33', '#aa33aa', '#33aaaa', '#cc6633'];
            for (let sy = bsY + 10; sy < bsY + bsH - 10; sy += 60) {
                ctx.fillStyle = '#5a3a1a';
                ctx.fillRect(bsX + 5, sy + 48, bsW - 10, 4);
                for (let bx = bsX + 8; bx < bsX + bsW - 15; bx += 12) {
                    ctx.fillStyle = bookColors[Math.floor(Math.random() * bookColors.length)];
                    const bh = 20 + Math.random() * 25;
                    ctx.fillRect(bx, sy + 48 - bh, 10, bh);
                }
            }

            // Window
            const winX = 320, winY = 100, winW = 100, winH = 140;
            ctx.fillStyle = '#0a1a3a';
            ctx.fillRect(winX, winY, winW, winH);
            ctx.fillStyle = '#ffdd44';
            ctx.beginPath(); ctx.arc(winX + 50, winY + 70, 25, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ffffff';
            const starPos = [[30, 20], [70, 30], [50, 50], [80, 80], [20, 90], [60, 120]];
            starPos.forEach(([sx, sy]) => {
                ctx.fillRect(winX + sx, winY + sy, 2, 2);
            });
            ctx.strokeStyle = '#5a3a1a';
            ctx.lineWidth = 4;
            ctx.strokeRect(winX - 2, winY - 2, winW + 4, winH + 4);
            ctx.beginPath(); ctx.moveTo(winX + winW / 2, winY); ctx.lineTo(winX + winW / 2, winY + winH); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(winX, winY + winH / 2); ctx.lineTo(winX + winW, winY + winH / 2); ctx.stroke();

            // Table
            ctx.fillStyle = '#6a4a2a';
            ctx.fillRect(160, 420, 160, 12);
            ctx.fillStyle = '#5a3a1a';
            ctx.fillRect(175, 432, 8, 50);
            ctx.fillRect(300, 432, 8, 50);

            // Candle
            ctx.fillStyle = '#eedd88';
            ctx.fillRect(234, 395, 12, 25);
            ctx.fillStyle = '#ff8800';
            ctx.beginPath(); ctx.arc(240, 390, 8, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ffcc00';
            ctx.beginPath(); ctx.arc(240, 390, 5, 0, Math.PI * 2); ctx.fill();

            // Candle glow
            const grd = ctx.createRadialGradient(240, 390, 5, 240, 390, 120);
            grd.addColorStop(0, 'rgba(255,200,50,0.3)');
            grd.addColorStop(1, 'rgba(255,200,50,0)');
            ctx.fillStyle = grd;
            ctx.fillRect(120, 270, 240, 240);
        });
    }

    genBgForest(W, H) {
        this.createCanvasTexture('bg-forest', W, H, (ctx, w, h) => {
            // Night sky gradient
            const sky = ctx.createLinearGradient(0, 0, 0, h * 0.4);
            sky.addColorStop(0, '#000000');
            sky.addColorStop(1, '#0a1a2a');
            ctx.fillStyle = sky;
            ctx.fillRect(0, 0, w, h * 0.4);

            // Ground
            ctx.fillStyle = '#0a2a0a';
            ctx.fillRect(0, h * 0.35, w, h * 0.65);

            // Moon
            ctx.fillStyle = '#eeeeff';
            ctx.beginPath(); ctx.arc(380, 60, 30, 0, Math.PI * 2); ctx.fill();
            const moonGlow = ctx.createRadialGradient(380, 60, 20, 380, 60, 80);
            moonGlow.addColorStop(0, 'rgba(200,200,255,0.3)');
            moonGlow.addColorStop(1, 'rgba(200,200,255,0)');
            ctx.fillStyle = moonGlow;
            ctx.beginPath(); ctx.arc(380, 60, 80, 0, Math.PI * 2); ctx.fill();

            // Far trees (silhouettes)
            ctx.fillStyle = '#0a150a';
            for (let x = 0; x < w; x += 30) {
                const th = 100 + Math.random() * 80;
                ctx.beginPath();
                ctx.moveTo(x, h * 0.35);
                ctx.lineTo(x + 15, h * 0.35 - th);
                ctx.lineTo(x + 30, h * 0.35);
                ctx.fill();
            }

            // Mid trees (trunk + canopy)
            for (let x = 30; x < w; x += 70) {
                const ty = h * 0.5;
                ctx.fillStyle = '#2a1a0a';
                ctx.fillRect(x + 10, ty - 60, 8, 60);
                ctx.fillStyle = '#1a3a1a';
                ctx.beginPath(); ctx.arc(x + 14, ty - 70, 30, 0, Math.PI * 2); ctx.fill();
            }

            // Near bushes
            ctx.fillStyle = '#1a4a1a';
            for (let x = 10; x < w; x += 50) {
                ctx.beginPath(); ctx.arc(x + 20, h * 0.7, 20, 0, Math.PI * 2); ctx.fill();
            }

            // Glowing mushrooms
            const mushColors = ['#ff44aa', '#44aaff', '#aaff44'];
            for (let i = 0; i < 8; i++) {
                const mx = 30 + Math.random() * (w - 60);
                const my = h * 0.6 + Math.random() * (h * 0.3);
                const col = mushColors[i % 3];
                ctx.fillStyle = col;
                ctx.beginPath(); ctx.arc(mx, my, 4, 0, Math.PI * 2); ctx.fill();
                const mg = ctx.createRadialGradient(mx, my, 2, mx, my, 20);
                mg.addColorStop(0, col.replace(')', ',0.4)').replace('rgb', 'rgba'));
                mg.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = 'rgba(100,255,100,0.2)';
                ctx.beginPath(); ctx.arc(mx, my, 20, 0, Math.PI * 2); ctx.fill();
            }

            // Stone path
            ctx.fillStyle = '#3a3a3a';
            for (let x = 100; x < 350; x += 35) {
                const py = h * 0.85 + Math.sin(x * 0.05) * 15;
                ctx.fillRect(x, py, 28, 10);
            }

            // Grass tufts
            ctx.strokeStyle = '#2a5a2a';
            for (let i = 0; i < 30; i++) {
                const gx = Math.random() * w;
                const gy = h * 0.5 + Math.random() * (h * 0.45);
                for (let j = -1; j <= 1; j++) {
                    ctx.beginPath();
                    ctx.moveTo(gx + j * 3, gy);
                    ctx.lineTo(gx + j * 3 + (j * 2), gy - 10 - Math.random() * 5);
                    ctx.stroke();
                }
            }

            // Fireflies
            ctx.fillStyle = '#ffff44';
            for (let i = 0; i < 15; i++) {
                const fx = Math.random() * w;
                const fy = h * 0.2 + Math.random() * (h * 0.5);
                ctx.beginPath(); ctx.arc(fx, fy, 2, 0, Math.PI * 2); ctx.fill();
            }
        });
    }

    genBgTower(W, H) {
        this.createCanvasTexture('bg-tower', W, H, (ctx, w, h) => {
            // Sky
            ctx.fillStyle = '#0a1a3a';
            ctx.fillRect(0, 0, w, h);

            // Lightning bolt
            ctx.strokeStyle = '#88aaff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(350, 0);
            ctx.lineTo(340, 100);
            ctx.lineTo(360, 110);
            ctx.lineTo(330, 220);
            ctx.lineTo(355, 230);
            ctx.lineTo(320, 350);
            ctx.stroke();

            // Tower body
            ctx.fillStyle = '#1a1a2a';
            ctx.fillRect(160, 200, 160, 600);

            // Tower spire
            ctx.fillStyle = '#1a1a2a';
            ctx.beginPath();
            ctx.moveTo(160, 200);
            ctx.lineTo(240, 50);
            ctx.lineTo(320, 200);
            ctx.fill();

            // Stone lines
            ctx.strokeStyle = '#2a2a3a';
            for (let y = 200; y < h; y += 20) {
                ctx.beginPath(); ctx.moveTo(160, y); ctx.lineTo(320, y); ctx.stroke();
            }
            for (let y = 200; y < h; y += 40) {
                const off = (Math.floor(y / 40) % 2) * 30;
                for (let x = 160 + off; x < 320; x += 60) {
                    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 40); ctx.stroke();
                }
            }

            // Glowing green windows
            const winPositions = [[210, 280], [250, 280], [210, 380], [250, 380], [210, 480]];
            winPositions.forEach(([wx, wy]) => {
                ctx.fillStyle = '#00ff44';
                ctx.fillRect(wx, wy, 20, 30);
                const wg = ctx.createRadialGradient(wx + 10, wy + 15, 5, wx + 10, wy + 15, 40);
                wg.addColorStop(0, 'rgba(0,255,68,0.3)');
                wg.addColorStop(1, 'rgba(0,255,68,0)');
                ctx.fillStyle = wg;
                ctx.beginPath(); ctx.arc(wx + 10, wy + 15, 40, 0, Math.PI * 2); ctx.fill();
            });

            // Floating runes
            ctx.fillStyle = '#00ff44';
            for (let i = 0; i < 20; i++) {
                const rx = Math.random() * w;
                const ry = Math.random() * h;
                ctx.beginPath(); ctx.arc(rx, ry, 3, 0, Math.PI * 2); ctx.fill();
            }
        });
    }

    genBgBridge(W, H) {
        this.createCanvasTexture('bg-bridge', W, H, (ctx, w, h) => {
            // Dark red sky gradient
            const sky = ctx.createLinearGradient(0, 0, 0, h * 0.5);
            sky.addColorStop(0, '#1a0a0a');
            sky.addColorStop(1, '#3a1a1a');
            ctx.fillStyle = sky;
            ctx.fillRect(0, 0, w, h);

            // Distant mountains
            ctx.fillStyle = '#2a1a1a';
            ctx.beginPath();
            ctx.moveTo(0, 250);
            ctx.lineTo(80, 100); ctx.lineTo(150, 200); ctx.lineTo(230, 80);
            ctx.lineTo(320, 180); ctx.lineTo(400, 60); ctx.lineTo(480, 200);
            ctx.lineTo(480, 300); ctx.lineTo(0, 300);
            ctx.fill();

            // Chasm depth
            const chasm = ctx.createLinearGradient(0, h * 0.4, 0, h);
            chasm.addColorStop(0, '#0a0a0a');
            chasm.addColorStop(1, '#000000');
            ctx.fillStyle = chasm;
            ctx.fillRect(0, h * 0.4, w, h * 0.6);

            // Left cliff
            ctx.fillStyle = '#2a2a2a';
            ctx.fillRect(0, h * 0.3, 100, h * 0.7);
            ctx.fillStyle = '#1a1a1a';
            for (let y = h * 0.3; y < h; y += 15) {
                ctx.fillRect(0, y, 100, 1);
            }

            // Right cliff
            ctx.fillStyle = '#2a2a2a';
            ctx.fillRect(w - 100, h * 0.3, 100, h * 0.7);

            // Bridge planks
            ctx.fillStyle = '#5a3a1a';
            const bridgeY = h * 0.55;
            for (let x = 90; x < w - 90; x += 12) {
                ctx.fillRect(x, bridgeY, 10, 6);
            }
            // Bridge support lines
            ctx.strokeStyle = '#4a3a1a';
            ctx.lineWidth = 3;
            for (let x = 100; x < w - 100; x += 40) {
                ctx.beginPath(); ctx.moveTo(x, bridgeY); ctx.lineTo(x, bridgeY + 40); ctx.stroke();
            }

            // Rope railings
            ctx.strokeStyle = '#aa9966';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(90, bridgeY - 15);
            for (let x = 100; x < w - 90; x += 5) {
                ctx.lineTo(x, bridgeY - 15 + Math.sin(x * 0.1) * 3);
            }
            ctx.stroke();
        });
    }

    genBgCastle(W, H) {
        this.createCanvasTexture('bg-castle', W, H, (ctx, w, h) => {
            // Dark purple background
            ctx.fillStyle = '#1a0a2a';
            ctx.fillRect(0, 0, w, h);

            // Castle silhouette
            ctx.fillStyle = '#0a0a1a';
            // Main wall
            ctx.fillRect(80, 300, 320, 500);
            // Three spires
            ctx.beginPath();
            ctx.moveTo(80, 300); ctx.lineTo(120, 100); ctx.lineTo(160, 300);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(180, 300); ctx.lineTo(240, 50); ctx.lineTo(300, 300);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(320, 300); ctx.lineTo(360, 120); ctx.lineTo(400, 300);
            ctx.fill();

            // Battlements
            for (let x = 80; x < 400; x += 30) {
                ctx.fillRect(x, 280, 20, 20);
            }

            // Glowing purple windows
            const purpleWin = [[130, 350], [230, 350], [340, 350], [180, 450], [280, 450]];
            purpleWin.forEach(([wx, wy]) => {
                ctx.fillStyle = '#aa44ff';
                ctx.fillRect(wx, wy, 25, 35);
                const wg = ctx.createRadialGradient(wx + 12, wy + 17, 5, wx + 12, wy + 17, 50);
                wg.addColorStop(0, 'rgba(170,68,255,0.3)');
                wg.addColorStop(1, 'rgba(170,68,255,0)');
                ctx.fillStyle = wg;
                ctx.beginPath(); ctx.arc(wx + 12, wy + 17, 50, 0, Math.PI * 2); ctx.fill();
            });

            // Iron gate
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(180, 650, 120, 150);
            ctx.strokeStyle = '#2a2a2a';
            ctx.lineWidth = 4;
            for (let gx = 185; gx < 300; gx += 15) {
                ctx.beginPath(); ctx.moveTo(gx, 650); ctx.lineTo(gx, 800); ctx.stroke();
            }
            ctx.beginPath(); ctx.moveTo(180, 700); ctx.lineTo(300, 700); ctx.stroke();

            // Magical shimmer
            ctx.fillStyle = '#cc66ff';
            for (let i = 0; i < 30; i++) {
                const sx = Math.random() * w;
                const sy = Math.random() * h;
                ctx.beginPath(); ctx.arc(sx, sy, 2, 0, Math.PI * 2); ctx.fill();
            }
        });
    }

    genBgThrone(W, H) {
        this.createCanvasTexture('bg-throne', W, H, (ctx, w, h) => {
            // Crimson interior
            ctx.fillStyle = '#3a0a0a';
            ctx.fillRect(0, 0, w, h);

            // Floor
            ctx.fillStyle = '#2a0a0a';
            ctx.fillRect(0, h * 0.7, w, h * 0.3);

            // Red carpet
            ctx.fillStyle = '#8a1111';
            ctx.fillRect(180, h * 0.7, 120, h * 0.3);
            ctx.strokeStyle = '#cc8800';
            ctx.lineWidth = 2;
            ctx.strokeRect(185, h * 0.7, 110, h * 0.3);

            // Columns
            ctx.fillStyle = '#2a1a1a';
            ctx.fillRect(30, 50, 40, h * 0.65);
            ctx.fillRect(w - 70, 50, 40, h * 0.65);
            // Column details
            ctx.fillStyle = '#3a2a2a';
            ctx.fillRect(25, 40, 50, 15);
            ctx.fillRect(25, h * 0.65 + 35, 50, 15);
            ctx.fillRect(w - 75, 40, 50, 15);
            ctx.fillRect(w - 75, h * 0.65 + 35, 50, 15);

            // Banners
            ctx.fillStyle = '#8a1111';
            ctx.fillRect(80, 60, 50, 120);
            ctx.fillRect(w - 130, 60, 50, 120);
            ctx.strokeStyle = '#cc8800';
            ctx.lineWidth = 2;
            ctx.strokeRect(80, 60, 50, 120);
            ctx.strokeRect(w - 130, 60, 50, 120);

            // Golden throne
            const tx = 190, ty = 350;
            ctx.fillStyle = '#8a6a2a';
            ctx.fillRect(tx, ty, 100, 130);
            // Back
            ctx.fillStyle = '#cc9922';
            ctx.fillRect(tx + 10, ty - 60, 80, 70);
            // Gold trim
            ctx.strokeStyle = '#ffcc00';
            ctx.lineWidth = 3;
            ctx.strokeRect(tx + 5, ty - 55, 90, 60);
            ctx.strokeRect(tx - 2, ty - 2, 104, 134);
            // Arm rests
            ctx.fillStyle = '#cc9922';
            ctx.fillRect(tx - 15, ty + 20, 20, 60);
            ctx.fillRect(tx + 95, ty + 20, 20, 60);

            // Candelabras
            [[120, 380], [350, 380]].forEach(([cx, cy]) => {
                ctx.fillStyle = '#cc9922';
                ctx.fillRect(cx, cy, 4, 50);
                ctx.fillRect(cx - 10, cy + 45, 24, 4);
                for (let i = -1; i <= 1; i++) {
                    ctx.fillStyle = '#ffcc00';
                    ctx.beginPath(); ctx.arc(cx + 2 + i * 10, cy - 5, 5, 0, Math.PI * 2); ctx.fill();
                }
            });
        });
    }

    genBgSunrise(W, H) {
        this.createCanvasTexture('bg-sunrise', W, H, (ctx, w, h) => {
            // Sky gradient
            const sky = ctx.createLinearGradient(0, 0, 0, h * 0.6);
            sky.addColorStop(0, '#2266cc');
            sky.addColorStop(0.4, '#cc8844');
            sky.addColorStop(0.7, '#ffaa44');
            sky.addColorStop(1, '#ffcc66');
            ctx.fillStyle = sky;
            ctx.fillRect(0, 0, w, h);

            // Sun
            ctx.fillStyle = '#ffee44';
            ctx.beginPath(); ctx.arc(240, 200, 40, 0, Math.PI * 2); ctx.fill();
            // Rays
            ctx.strokeStyle = '#ffdd44';
            ctx.lineWidth = 2;
            for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
                ctx.beginPath();
                ctx.moveTo(240 + Math.cos(a) * 45, 200 + Math.sin(a) * 45);
                ctx.lineTo(240 + Math.cos(a) * 65, 200 + Math.sin(a) * 65);
                ctx.stroke();
            }

            // Rolling hills
            ctx.fillStyle = '#338833';
            ctx.beginPath();
            ctx.moveTo(0, h * 0.55);
            for (let x = 0; x <= w; x += 10) {
                ctx.lineTo(x, h * 0.55 + Math.sin(x * 0.02) * 20 + Math.sin(x * 0.007) * 30);
            }
            ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();

            ctx.fillStyle = '#226622';
            ctx.beginPath();
            ctx.moveTo(0, h * 0.65);
            for (let x = 0; x <= w; x += 10) {
                ctx.lineTo(x, h * 0.65 + Math.sin(x * 0.015 + 1) * 15 + Math.sin(x * 0.005) * 25);
            }
            ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();

            ctx.fillStyle = '#115511';
            ctx.beginPath();
            ctx.moveTo(0, h * 0.75);
            for (let x = 0; x <= w; x += 10) {
                ctx.lineTo(x, h * 0.75 + Math.sin(x * 0.012 + 2) * 10);
            }
            ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();

            // Clouds
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            [[80, 80], [300, 120], [180, 50]].forEach(([cx, cy]) => {
                ctx.beginPath();
                ctx.arc(cx, cy, 20, 0, Math.PI * 2);
                ctx.arc(cx + 20, cy - 5, 15, 0, Math.PI * 2);
                ctx.arc(cx - 15, cy + 5, 12, 0, Math.PI * 2);
                ctx.arc(cx + 10, cy + 5, 14, 0, Math.PI * 2);
                ctx.fill();
            });

            // Flowers
            const flowerColors = ['#ff4444', '#ffff44', '#ff44ff', '#44ffff', '#ff8844'];
            for (let i = 0; i < 50; i++) {
                ctx.fillStyle = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                const fx = Math.random() * w;
                const fy = h * 0.8 + Math.random() * (h * 0.18);
                ctx.beginPath(); ctx.arc(fx, fy, 3, 0, Math.PI * 2); ctx.fill();
            }
        });
    }

    genBgGarden(W, H) {
        this.createCanvasTexture('bg-garden', W, H, (ctx, w, h) => {
            // Blue sky
            const sky = ctx.createLinearGradient(0, 0, 0, h * 0.4);
            sky.addColorStop(0, '#4488cc');
            sky.addColorStop(1, '#88bbdd');
            ctx.fillStyle = sky;
            ctx.fillRect(0, 0, w, h);

            // Green ground
            ctx.fillStyle = '#33aa33';
            ctx.fillRect(0, h * 0.35, w, h * 0.65);

            // Hedges
            ctx.fillStyle = '#226622';
            ctx.fillRect(10, h * 0.4, 80, 40);
            ctx.fillRect(w - 90, h * 0.4, 80, 40);
            ctx.fillRect(10, h * 0.6, 60, 30);
            ctx.fillRect(w - 70, h * 0.6, 60, 30);

            // Stone path
            ctx.fillStyle = '#aaaaaa';
            for (let y = h * 0.5; y < h; y += 25) {
                const xOff = (Math.floor((y - h * 0.5) / 25) % 2) * 15;
                for (let x = 150 + xOff; x < 330; x += 30) {
                    ctx.fillRect(x, y, 26, 20);
                    ctx.strokeStyle = '#888888';
                    ctx.strokeRect(x, y, 26, 20);
                }
            }

            // Fountain
            ctx.fillStyle = '#668899';
            ctx.beginPath(); ctx.arc(240, h * 0.5, 35, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#4488cc';
            ctx.beginPath(); ctx.arc(240, h * 0.5, 25, 0, Math.PI * 2); ctx.fill();
            // Fountain spray
            ctx.fillStyle = '#aaddff';
            ctx.beginPath(); ctx.arc(240, h * 0.5 - 10, 5, 0, Math.PI * 2); ctx.fill();

            // Flower beds
            ctx.fillStyle = '#5a3a1a';
            ctx.fillRect(30, h * 0.55, 100, 20);
            ctx.fillRect(w - 130, h * 0.55, 100, 20);

            const flowerColors = ['#ff4444', '#ffaa00', '#ff44ff', '#4444ff', '#ffff44', '#ff8844'];
            // Flowers in beds
            for (let i = 0; i < 30; i++) {
                ctx.fillStyle = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                const fx = 30 + Math.random() * 100;
                const fy = h * 0.55 + Math.random() * 20;
                ctx.beginPath(); ctx.arc(fx, fy - 5, 3, 0, Math.PI * 2); ctx.fill();
            }
            for (let i = 0; i < 30; i++) {
                ctx.fillStyle = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                const fx = w - 130 + Math.random() * 100;
                const fy = h * 0.55 + Math.random() * 20;
                ctx.beginPath(); ctx.arc(fx, fy - 5, 3, 0, Math.PI * 2); ctx.fill();
            }

            // Scattered flowers
            for (let i = 0; i < 40; i++) {
                ctx.fillStyle = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                const fx = Math.random() * w;
                const fy = h * 0.7 + Math.random() * (h * 0.28);
                ctx.beginPath(); ctx.arc(fx, fy, 2 + Math.random() * 2, 0, Math.PI * 2); ctx.fill();
            }

            // Sparkles
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 15; i++) {
                const sx = Math.random() * w;
                const sy = Math.random() * h * 0.4;
                ctx.fillRect(sx, sy, 2, 2);
            }
        });
    }

    // ── Characters ───────────────────────────────────────────────

    genCharacters() {
        const chars = [
            {
                key: 'char-diana',
                draw: (ctx) => {
                    ctx.fillStyle = '#332244';
                    ctx.fillRect(22, 70, 8, 26);
                    ctx.fillRect(34, 70, 8, 26);
                    ctx.fillStyle = '#ff6b9d';
                    ctx.beginPath();
                    ctx.moveTo(18, 38); ctx.lineTo(46, 38); ctx.lineTo(42, 70); ctx.lineTo(22, 70);
                    ctx.fill();
                    ctx.fillStyle = '#221133';
                    ctx.fillRect(28, 45, 8, 25);
                    ctx.fillRect(20, 65, 24, 5);
                    ctx.fillStyle = '#ffcc99';
                    ctx.beginPath(); ctx.arc(32, 26, 12, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#4488ff';
                    ctx.beginPath(); ctx.arc(28, 24, 2, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(36, 24, 2, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#2a0a0a';
                    ctx.beginPath(); ctx.arc(32, 20, 14, Math.PI, 0); ctx.fill();
                    ctx.fillRect(16, 26, 8, 30);
                    ctx.fillRect(40, 26, 8, 30);
                }
            },
            {
                key: 'char-seva',
                draw: (ctx) => {
                    ctx.fillStyle = '#334455';
                    ctx.fillRect(24, 70, 6, 26);
                    ctx.fillRect(34, 70, 6, 26);
                    ctx.fillStyle = '#446688';
                    ctx.fillRect(20, 38, 24, 35);
                    ctx.fillStyle = '#eebb99';
                    ctx.beginPath(); ctx.arc(32, 24, 12, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#111';
                    ctx.beginPath(); ctx.arc(28, 24, 2, 0, Math.PI*2); ctx.fill();
                    ctx.beginPath(); ctx.arc(36, 24, 2, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = '#aaaaaa';
                    ctx.beginPath(); ctx.arc(32, 18, 12, Math.PI, 0); ctx.fill();
                    ctx.fillRect(20, 18, 24, 4);
                }
            },
            {
                key: 'char-arsen',
                draw: (ctx) => {
                    ctx.fillStyle = '#3a4a2a';
                    ctx.fillRect(15, 75, 12, 21);
                    ctx.fillRect(37, 75, 12, 21);
                    ctx.fillStyle = '#4a703a';
                    ctx.beginPath(); ctx.ellipse(32, 55, 24, 22, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#3a502a';
                    ctx.fillRect(20, 60, 24, 15);
                    ctx.fillStyle = '#d4a070';
                    ctx.beginPath(); ctx.arc(32, 25, 15, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#111';
                    ctx.beginPath(); ctx.arc(27, 22, 2, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(37, 22, 2, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#4a2a1a';
                    ctx.beginPath(); ctx.ellipse(32, 32, 10, 4, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#4a2a1a';
                    ctx.beginPath(); ctx.arc(32, 16, 14, Math.PI, 0); ctx.fill();
                    ctx.fillRect(18, 16, 28, 6);
                }
            },
            {
                key: 'char-viktor',
                draw: (ctx) => {
                    ctx.fillStyle = '#111';
                    ctx.fillRect(26, 75, 4, 21);
                    ctx.fillRect(34, 75, 4, 21);
                    ctx.fillStyle = '#222';
                    ctx.beginPath(); ctx.moveTo(22, 35); ctx.lineTo(42, 35); ctx.lineTo(46, 80); ctx.lineTo(18, 80); ctx.fill();
                    ctx.fillStyle = '#f0c0a0';
                    ctx.beginPath(); ctx.arc(32, 24, 11, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#0f0';
                    ctx.fillRect(24, 21, 6, 4);
                    ctx.fillRect(34, 21, 6, 4);
                    ctx.strokeStyle = '#0f0';
                    ctx.beginPath(); ctx.moveTo(30, 23); ctx.lineTo(34, 23); ctx.stroke();
                    ctx.fillStyle = '#8a2be2';
                    ctx.beginPath();
                    ctx.moveTo(20, 18); ctx.lineTo(24, 8); ctx.lineTo(28, 14); ctx.lineTo(32, 4);
                    ctx.lineTo(36, 14); ctx.lineTo(40, 8); ctx.lineTo(44, 18);
                    ctx.fill();
                }
            },
            {
                key: 'char-swapna',
                draw: (ctx) => {
                    ctx.fillStyle = '#cc8866';
                    ctx.fillRect(26, 75, 4, 21);
                    ctx.fillRect(34, 75, 4, 21);
                    ctx.fillStyle = '#ff66aa';
                    ctx.beginPath(); ctx.moveTo(20, 35); ctx.lineTo(44, 35); ctx.lineTo(40, 85); ctx.lineTo(24, 85); ctx.fill();
                    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(20, 35); ctx.lineTo(40, 85); ctx.stroke();
                    ctx.fillStyle = '#cc8866';
                    ctx.beginPath(); ctx.arc(32, 24, 11, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#111';
                    ctx.beginPath(); ctx.ellipse(28, 24, 2, 1, 0, 0, Math.PI*2); ctx.fill();
                    ctx.beginPath(); ctx.ellipse(36, 24, 2, 1, 0, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = '#111';
                    ctx.beginPath(); ctx.arc(32, 20, 12, Math.PI, 0); ctx.fill();
                    ctx.fillRect(19, 20, 4, 40);
                    ctx.fillRect(41, 20, 4, 40);
                }
            },
            {
                key: 'char-jotaro',
                draw: (ctx) => {
                    ctx.fillStyle = '#1a1a2e';
                    ctx.fillRect(24, 70, 6, 26);
                    ctx.fillRect(34, 70, 6, 26);
                    ctx.fillStyle = '#1a1a2e';
                    ctx.fillRect(18, 35, 28, 45);
                    ctx.fillStyle = '#eee';
                    ctx.fillRect(26, 35, 12, 25);
                    ctx.fillStyle = '#ffd700';
                    ctx.fillRect(22, 36, 6, 2);
                    ctx.fillStyle = '#eebb99';
                    ctx.beginPath(); ctx.arc(32, 22, 11, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#111';
                    ctx.fillRect(27, 20, 3, 2);
                    ctx.fillRect(34, 20, 3, 2);
                    ctx.fillStyle = '#1a1a2e';
                    ctx.fillRect(16, 10, 24, 4);
                    ctx.fillRect(20, 2, 16, 10);
                    ctx.fillStyle = '#111';
                    ctx.fillRect(36, 10, 8, 14);
                    ctx.beginPath(); ctx.moveTo(36, 24); ctx.lineTo(44, 24); ctx.lineTo(36, 18); ctx.fill();
                }
            },
            {
                key: 'char-dio',
                draw: (ctx) => {
                    ctx.fillStyle = '#ffaa00';
                    ctx.fillRect(20, 70, 8, 26);
                    ctx.fillRect(36, 70, 8, 26);
                    ctx.fillStyle = '#aa0000';
                    ctx.fillRect(16, 35, 32, 35);
                    ctx.fillStyle = '#111';
                    ctx.fillRect(24, 35, 16, 15);
                    ctx.fillStyle = '#ffcc99';
                    ctx.beginPath(); ctx.arc(32, 22, 12, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#ff0000';
                    ctx.fillRect(26, 20, 3, 2);
                    ctx.fillRect(35, 20, 3, 2);
                    ctx.strokeStyle = '#111'; ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(28, 28); ctx.lineTo(36, 26); ctx.stroke();
                    ctx.fillStyle = '#ffd700';
                    ctx.beginPath(); ctx.moveTo(32, 5); ctx.lineTo(14, 25); ctx.lineTo(20, 25); ctx.lineTo(12, 35); ctx.lineTo(24, 20); ctx.fill();
                    ctx.beginPath(); ctx.moveTo(32, 5); ctx.lineTo(50, 25); ctx.lineTo(44, 25); ctx.lineTo(52, 35); ctx.lineTo(40, 20); ctx.fill();
                    ctx.beginPath(); ctx.arc(32, 16, 13, Math.PI, 0); ctx.fill();
                }
            },
            {
                key: 'char-siren1',
                draw: (ctx) => {
                    ctx.fillStyle = '#ccaa99';
                    ctx.fillRect(26, 65, 4, 31);
                    ctx.fillRect(34, 65, 4, 31);
                    ctx.fillStyle = '#ccaa99';
                    ctx.beginPath(); ctx.arc(32, 45, 10, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#882244';
                    ctx.fillRect(24, 38, 16, 8);
                    ctx.fillRect(26, 60, 12, 8);
                    ctx.fillStyle = '#ccaa99';
                    ctx.beginPath(); ctx.arc(32, 25, 11, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#111';
                    ctx.beginPath(); ctx.arc(28, 24, 2, 0, Math.PI*2); ctx.fill();
                    ctx.beginPath(); ctx.arc(36, 24, 2, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = '#ff66aa';
                    ctx.beginPath(); ctx.arc(32, 20, 12, Math.PI, 0); ctx.fill();
                    ctx.fillRect(20, 20, 6, 25);
                    ctx.fillRect(38, 20, 6, 25);
                }
            },
            {
                key: 'char-siren2',
                draw: (ctx) => {
                    ctx.fillStyle = '#333';
                    ctx.fillRect(24, 70, 6, 26);
                    ctx.fillRect(34, 70, 6, 26);
                    ctx.fillStyle = '#444';
                    ctx.fillRect(22, 35, 20, 30);
                    ctx.fillStyle = '#222';
                    ctx.beginPath(); ctx.arc(22, 35, 6, 0, Math.PI*2); ctx.fill();
                    ctx.beginPath(); ctx.arc(42, 35, 6, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = '#eebb99';
                    ctx.beginPath(); ctx.arc(32, 22, 11, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = '#111'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(26, 20); ctx.lineTo(30, 22); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(38, 20); ctx.lineTo(34, 22); ctx.stroke();
                    ctx.fillStyle = '#aa0000';
                    ctx.beginPath(); ctx.arc(32, 18, 12, Math.PI, 0); ctx.fill();
                }
            },
            {
                key: 'char-siren3',
                draw: (ctx) => {
                    ctx.fillStyle = '#662288';
                    ctx.beginPath(); ctx.moveTo(28, 30); ctx.lineTo(44, 96); ctx.lineTo(20, 96); ctx.fill();
                    ctx.fillStyle = '#ccaa99';
                    ctx.beginPath(); ctx.arc(32, 22, 11, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#ffd700';
                    ctx.beginPath(); ctx.moveTo(22, 16); ctx.lineTo(26, 8); ctx.lineTo(32, 14); ctx.lineTo(38, 8); ctx.lineTo(42, 16); ctx.fill();
                    ctx.fillStyle = '#111';
                    ctx.beginPath(); ctx.arc(28, 22, 2, 0, Math.PI*2); ctx.fill();
                    ctx.beginPath(); ctx.arc(36, 22, 2, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = '#222';
                    ctx.fillRect(20, 22, 4, 30);
                    ctx.fillRect(40, 22, 4, 30);
                }
            },
            {
                key: 'char-troll',
                draw: (ctx) => {
                    ctx.fillStyle = '#3a4a2a';
                    ctx.fillRect(15, 75, 12, 21);
                    ctx.fillRect(37, 75, 12, 21);
                    ctx.fillStyle = '#4a602a';
                    ctx.beginPath(); ctx.ellipse(32, 50, 26, 30, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#5a3a1a';
                    ctx.fillRect(22, 65, 20, 15);
                    ctx.fillStyle = '#4a602a';
                    ctx.beginPath(); ctx.arc(32, 15, 16, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#ff0000';
                    ctx.fillRect(24, 12, 4, 2);
                    ctx.fillRect(36, 12, 4, 2);
                    ctx.strokeStyle = '#111'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(22, 10); ctx.lineTo(28, 12); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(42, 10); ctx.lineTo(36, 12); ctx.stroke();
                    ctx.fillStyle = '#4a2a1a';
                    ctx.beginPath(); ctx.moveTo(10, 40); ctx.lineTo(0, 10); ctx.lineTo(15, 5); ctx.lineTo(20, 40); ctx.fill();
                }
            }
        ];

        chars.forEach(c => {
            this.createCanvasTexture(c.key, 64, 96, (ctx) => {
                c.draw(ctx);
            });
        });
    }

    // ── Particles ────────────────────────────────────────────────

    genParticles() {
        // Fire particle
        this.createCanvasTexture('particle-fire', 16, 16, (ctx) => {
            const grd = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
            grd.addColorStop(0, '#ffffff');
            grd.addColorStop(0.3, '#ffaa00');
            grd.addColorStop(0.7, '#ff4400');
            grd.addColorStop(1, 'rgba(255,0,0,0)');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, 16, 16);
        });

        // Leaf particle
        this.createCanvasTexture('particle-leaf', 16, 16, (ctx) => {
            ctx.fillStyle = '#44aa22';
            ctx.beginPath();
            ctx.ellipse(8, 8, 6, 3, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#227711';
            ctx.beginPath();
            ctx.moveTo(4, 12); ctx.lineTo(12, 4);
            ctx.stroke();
        });

        // Sparkle particle
        this.createCanvasTexture('particle-sparkle', 16, 16, (ctx) => {
            const grd = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
            grd.addColorStop(0, '#ffffff');
            grd.addColorStop(0.3, '#ffffcc');
            grd.addColorStop(1, 'rgba(255,255,200,0)');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(7, 2, 2, 12);
            ctx.fillRect(2, 7, 12, 2);
        });

        // Code particle
        this.createCanvasTexture('particle-code', 16, 16, (ctx) => {
            ctx.fillStyle = '#00ff88';
            ctx.font = '10px monospace';
            ctx.fillText('{}', 1, 12);
        });
    }
}
