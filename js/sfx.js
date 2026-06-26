// js/sfx.js — Retro 8-bit sound effects using Web Audio API
var SFX = (function () {
    var ctx = null;

    function getCtx() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return ctx;
    }

    function playTone(freq, duration, type, freqEnd, vol) {
        var c = getCtx();
        var o = c.createOscillator();
        var g = c.createGain();
        o.type = type || 'square';
        o.frequency.setValueAtTime(freq, c.currentTime);
        if (freqEnd !== undefined) {
            o.frequency.linearRampToValueAtTime(freqEnd, c.currentTime + duration);
        }
        g.gain.setValueAtTime(vol || 0.15, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
        o.connect(g);
        g.connect(c.destination);
        o.start(c.currentTime);
        o.stop(c.currentTime + duration);
    }

    return {
        playClick: function () {
            playTone(800, 0.06, 'square', 600, 0.1);
        },
        playChoice: function () {
            playTone(440, 0.08, 'square');
            setTimeout(function () { playTone(660, 0.08, 'square'); }, 80);
            setTimeout(function () { playTone(880, 0.12, 'square', undefined, 0.12); }, 160);
        },
        playChapterStart: function () {
            playTone(330, 0.15, 'triangle', 440, 0.12);
            setTimeout(function () { playTone(440, 0.15, 'triangle', 550, 0.12); }, 150);
            setTimeout(function () { playTone(550, 0.15, 'triangle', 660, 0.12); }, 300);
            setTimeout(function () { playTone(660, 0.3, 'triangle', 880, 0.15); }, 450);
        },
        playEnding: function () {
            var notes = [523, 587, 659, 784, 880, 1047];
            notes.forEach(function (n, i) {
                setTimeout(function () {
                    playTone(n, 0.2, 'triangle', undefined, 0.12);
                }, i * 180);
            });
        }
    };
})();
