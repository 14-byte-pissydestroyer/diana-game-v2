const GAME_DATA = {
    scenes: {
        'ch1_s1': {
            id: 'ch1_s1',
            bg: 'cottage',
            chapter: 1,
            characters: ['diana'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Тихий вечер в маленьком домике на краю леса. Свечи мерцают, за окном шумят деревья.\nТы — Диана, и сегодня что-то не так...', isNarrator: true},
                {speaker: 'Диана', text: '"Что-то тревожное чувство... Как будто что-то случилось."'},
                {speaker: 'Рассказчик', text: 'Свиток магически появляется на столе со вспышкой.', isNarrator: true},
                {speaker: 'Диана', text: '"Что это?! Свитка... От Севы!"'},
                {speaker: 'Рассказчик', text: 'Она открывает его — текст частично поврежден:', isNarrator: true},
                {speaker: 'Сева', text: '"Диана... если ты это читаешь... меня увели... на север... замок... помог—"\n(текст обрывается)'}
            ],
            choices: [
                {text: '"Нужно идти немедленно!"', emoji: '🗡️', nextScene: 'ch2_s1', effects: {courage: 1}},
                {text: '"Подожди, попробую восстановить текст..."', emoji: '📜', nextScene: 'ch1_s2'},
                {text: '"Может, соседи помогут?"', emoji: '🏠', nextScene: 'ch1_s3'}
            ]
        },
        'ch1_s2': {
            id: 'ch1_s2',
            bg: 'cottage',
            chapter: 1,
            characters: ['diana'],
            dialogue: [
                {speaker: 'Диана', text: '"Сирены боятся чистой любви..." Понятно. Нужно торопиться!'}
            ],
            choices: [
                {text: 'Отправиться в путь', emoji: '➡️', nextScene: 'ch2_s1', effects: {addItem: 'Подсказка о Сиренах'}}
            ]
        },
        'ch1_s3': {
            id: 'ch1_s3',
            bg: 'cottage',
            chapter: 1,
            characters: ['diana'],
            dialogue: [
                {speaker: 'Сосед', text: '"Ох, Диана, держи зелье исцеления. Будь осторожна в лесу!"'}
            ],
            choices: [
                {text: 'Отправиться в путь', emoji: '➡️', nextScene: 'ch2_s1', effects: {addItem: 'Зелье исцеления'}}
            ]
        },
        'ch2_s1': {
            id: 'ch2_s1',
            bg: 'forest',
            chapter: 2,
            characters: ['diana'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Тёмный лес окутывает тебя. Тропинка едва видна в свете луны.\nВетви скрипят, что-то шуршит в кустах...', isNarrator: true},
                {speaker: 'Диана', text: '"Так темно... Но я должна идти дальше."'},
                {speaker: 'Рассказчик', text: 'Звуки приближения чего-то большого. ОГРОМНАЯ фигура выходит из-за деревьев.', isNarrator: true}
            ],
            choices: [
                {text: 'Продолжить', emoji: '➡️', nextScene: 'ch2_s2'}
            ]
        },
        'ch2_s2': {
            id: 'ch2_s2',
            bg: 'forest',
            chapter: 2,
            characters: ['diana', 'arsenius'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Появляется Арсенеус Макаряниус — массивный, с доброй улыбкой.', isNarrator: true},
                {speaker: 'Арсенеус', text: '"А, мелкая! Ты куда одна-то? В лесу одному нельзя...\nЛадно, не бойсь. Я — Арсенеус Макаряниус. Лесной барон.\nА можно друге? Гы гы."'},
                {speaker: 'Диана', text: '"Я ищу своего... друга. Его увели на север, к замку."'},
                {speaker: 'Арсенеус', text: '"К Замку Сирен?! Хм-м-м... Я видел, как три женщины тащили какого-то парня туда. Высокий такой, да?\nОх, мелкая, это опасно. Но я проводу тебя до развилки."'}
            ],
            choices: [
                {text: '"Пойдём вместе, Арсенеус!"', emoji: '🤝', nextScene: 'ch3_s1', effects: {setFlag: 'arsenius_ally', addItem: 'Щит Барона'}},
                {text: '"Спасибо, но я пойду напрямик через чащу!"', emoji: '⚡', nextScene: 'ch2_s3', effects: {courage: 1}},
                {text: '"Расскажи подробнее о Сиренах."', emoji: '💬', nextScene: 'ch2_s4'}
            ]
        },
        'ch2_s3': {
            id: 'ch2_s3',
            bg: 'forest',
            chapter: 2,
            characters: ['diana'],
            dialogue: [
                {speaker: 'Рассказчик', text: '(Мини-игра: уклонение от падающих веток - пропускаем для визуальной новеллы)', isNarrator: true}
            ],
            choices: [
                {text: 'Продолжить', emoji: '➡️', nextScene: 'ch3_s1'}
            ]
        },
        'ch2_s4': {
            id: 'ch2_s4',
            bg: 'forest',
            chapter: 2,
            characters: ['diana', 'arsenius'],
            dialogue: [
                {speaker: 'Арсенеус', text: '"Сирены боятся слов, сказанных от сердца. Помни это!"'}
            ],
            choices: [
                {text: 'Продолжить путь', emoji: '➡️', nextScene: 'ch3_s1', effects: {addItem: 'Подсказка о Сиренах'}}
            ]
        },
        'ch3_s1': {
            id: 'ch3_s1',
            bg: 'tower',
            chapter: 3,
            characters: ['diana'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Поляна расступается, и ты видишь... башню. Но не обычную.\nСтены светятся рунами, похожими на... код? Экраны мерцают вместо окон.', isNarrator: true},
                {speaker: 'Диана', text: '"Что за место...?"'},
                {speaker: 'Голос изнутри', text: '"Ошибка в строке 42... Нет, стоп, это же рекурсия... Ой, подождите!"'}
            ],
            choices: [
                {text: 'Войти в башню', emoji: '🚪', nextScene: 'ch3_s2'}
            ]
        },
        'ch3_s2': {
            id: 'ch3_s2',
            bg: 'tower',
            chapter: 3,
            characters: ['diana', 'viktor', 'swapna'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Появляется Виксториус Голик — стройный, со светящейся клавиатурой.', isNarrator: true},
                {speaker: 'Виктор', text: '"О, Диана! Сева? Его увели? Я тут... ну, я магическую систему переписываю на новый стек.\nНо могу помочь! У меня тут кое-что есть..."'},
                {speaker: 'Рассказчик', text: 'Появляется Свапна — спокойная, с аурой исцеления.', isNarrator: true},
                {speaker: 'Свапна', text: '"Диана, я дам тебе зелье исцеления. Тебе оно пригодится.\nИ запомни: Сирены питаются сомнениями. Если ты уверена в себе — их магия бессильна."'},
                {speaker: 'Виктор', text: '"А я могу дать тебе Хакерский Артефакт. Он нарушает магические барьеры. Ну, технически магия — это просто API..."'}
            ],
            choices: [
                {text: '"Дай мне Артефакт!"', emoji: '💻', nextScene: 'ch4_s1', effects: {addItem: 'Хакерский Артефакт'}},
                {text: '"Научи меня заклинанию защиты!"', emoji: '🌸', nextScene: 'ch4_s1', effects: {addItem: 'Заклинание защиты'}},
                {text: '"Спасибо, но я должна идти!"', emoji: '🤷', nextScene: 'ch4_s1', effects: {courage: 1}}
            ]
        },
        'ch4_s1': {
            id: 'ch4_s1',
            bg: 'bridge',
            chapter: 4,
            characters: ['diana', 'troll'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Дорога к замку преграждена. Разрушенный мост над чёрной бездной.\nНа другой стороне — огромный тролль-стражник.', isNarrator: true},
                {speaker: 'Тролль', text: '"Стой! Не пройдёшь без ответов! Три загадки — или назад!"'},
                {speaker: 'Тролль', text: '"В каком городе родился тот, кого ты ищешь?"'}
            ],
            choices: [
                {text: 'Вроцлав', emoji: '❌', nextScene: 'ch4_s1_f1'},
                {text: 'Майнц', emoji: '❌', nextScene: 'ch4_s1_f1'},
                {text: 'Донецк', emoji: '✅', nextScene: 'ch4_s2'},
                {text: 'Варшава', emoji: '❌', nextScene: 'ch4_s1_f1'}
            ]
        },
        'ch4_s1_f1': {
            id: 'ch4_s1_f1',
            bg: 'bridge',
            chapter: 4,
            characters: ['diana', 'troll'],
            dialogue: [
                {speaker: 'Тролль', text: '"Ха! Не знаешь даже, откуда он? Попробуй ещё."'}
            ],
            choices: [
                {text: 'Попробовать снова', emoji: '↩️', nextScene: 'ch4_s1'}
            ]
        },
        'ch4_s2': {
            id: 'ch4_s2',
            bg: 'bridge',
            chapter: 4,
            characters: ['diana', 'troll'],
            dialogue: [
                {speaker: 'Тролль', text: '"Хм... Ладно, первое зачёт."\n"Второй вопрос! Реши уравнение: 4x + 16 = 44. Чему равен x?"'}
            ],
            choices: [
                {text: '5', emoji: '❌', nextScene: 'ch4_s2_f2'},
                {text: '7', emoji: '✅', nextScene: 'ch4_s3'},
                {text: '10', emoji: '❌', nextScene: 'ch4_s2_f2'},
                {text: '12', emoji: '❌', nextScene: 'ch4_s2_f2'}
            ]
        },
        'ch4_s2_f2': {
            id: 'ch4_s2_f2',
            bg: 'bridge',
            chapter: 4,
            characters: ['diana', 'troll'],
            dialogue: [
                {speaker: 'Тролль', text: '"Думай лучше!"'}
            ],
            choices: [
                {text: 'Попробовать снова', emoji: '↩️', nextScene: 'ch4_s2'}
            ]
        },
        'ch4_s3': {
            id: 'ch4_s3',
            bg: 'bridge',
            chapter: 4,
            characters: ['diana', 'troll'],
            dialogue: [
                {speaker: 'Тролль', text: '"Ха, неплохо для авантюристки."\n"Последний вопрос, путница. Самый важный.\nЧто для тебя Сева?"'}
            ],
            choices: [
                {text: '(Ответить сердцем)', emoji: '💖', nextScene: 'ch4_s4'}
            ]
        },
        'ch4_s4': {
            id: 'ch4_s4',
            bg: 'bridge',
            chapter: 4,
            characters: ['diana', 'troll'],
            dialogue: [
                {speaker: 'Тролль', text: '"Хммм... серьёзно? Ладно, вижу — ты отвечаешь сердцем. Проходи."'},
                {speaker: 'Рассказчик', text: 'Мост магически восстанавливается. Диана переходит на другую сторону.', isNarrator: true}
            ],
            choices: [
                {text: 'Перейти мост', emoji: '➡️', nextScene: 'ch4_s5'}
            ]
        },
        'ch4_s5': {
            id: 'ch4_s5',
            bg: 'bridge',
            chapter: 4,
            characters: ['diana', 'jotaro'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'После перехода моста фигура опирается на мертвое дерево.\nВысокий мужчина в школьной форме и шляпе. Призрачная синяя фигура — Star Platinum — мерцает позади него.', isNarrator: true},
                {speaker: 'Джотаро', text: '"Yare yare daze...\nТы тоже идёшь к замку? На Сирен?"'},
                {speaker: 'Диана', text: '"Да! Они забрали моего..."'},
                {speaker: 'Джотаро', text: '"Понял. Я тоже имею счёты кое с кем там.\n...Дио. Он стоит за всем этим.\nЛадно. Идём вместе."'}
            ],
            choices: [
                {text: '"Спасибо, Джотаро! Давай вместе!"', emoji: '⭐', nextScene: 'ch5_s1', effects: {setFlag: 'jotaro_ally', addItem: 'Звезда Платинума'}},
                {text: '"Кто такой Дио?"', emoji: '🤔', nextScene: 'ch4_s6'},
                {text: '"Я справлюсь сама!"', emoji: '💪', nextScene: 'ch5_s1', effects: {courage: 1}}
            ]
        },
        'ch4_s6': {
            id: 'ch4_s6',
            bg: 'bridge',
            chapter: 4,
            characters: ['diana', 'jotaro'],
            dialogue: [
                {speaker: 'Джотаро', text: '"Дио — тёмный лорд, который контролирует Сирен из тени."'}
            ],
            choices: [
                {text: 'Идти к замку', emoji: '➡️', nextScene: 'ch5_s1', effects: {setFlag: 'jotaro_ally', addItem: 'Звезда Платинума'}}
            ]
        },
        'ch5_s1': {
            id: 'ch5_s1',
            bg: 'castle',
            chapter: 5,
            characters: ['diana'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Замок Сирен возвышается перед тобой. Чёрные шпили, фиолетовое свечение.\nВнутри — красота и опасность. Зеркала отражают не то, что есть на самом деле.', isNarrator: true},
                {speaker: 'Диана', text: '"Сева... Я иду."'}
            ],
            choices: [
                {text: 'Войти в тронный зал', emoji: '🚪', nextScene: 'ch5_s2'}
            ]
        },
        'ch5_s2': {
            id: 'ch5_s2',
            bg: 'throne',
            chapter: 5,
            characters: ['diana', 'sirens', 'seva'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Три Сирены появляются в тронном зале. Сева на пьедестале, спит, окруженный магическими цепями.', isNarrator: true},
                {speaker: 'Шлюхидзе', text: '"О, какая милая гостья! Пришла забрать нашего пленника?\nОн о тебе и не вспоминал... Здесь ему хорошо."'},
                {speaker: 'Протитутидзе', text: '"Слабак! Ты не пройдёшь через нас!"'},
                {speaker: 'Тёлкидзе', text: '"Время здесь работает по моим правилам. Ты уже опоздала."'},
                {speaker: 'Диана', text: '"Отпустите его! Это не ваше право!"'}
            ],
            choices: [
                {text: 'Продолжить', emoji: '➡️', nextScene: 'ch5_s3'}
            ]
        },
        'ch5_s3': {
            id: 'ch5_s3',
            bg: 'throne',
            chapter: 5,
            characters: ['diana', 'dio', 'sirens', 'seva'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Тёмная фигура материализуется позади Сирен. Блондин, мускулистый, с угрожающей улыбкой.', isNarrator: true},
                {speaker: 'Дио', text: '"Хо-хо... Ты пришла? Какая храбрая маленькая девочка.\nТы думаешь, ты можешь изменить судьбу? Невежественное дитя...\nЭтот мир принадлежит МНЕ. И этот юноша — тоже."'},
                {speaker: 'Диана', text: '"Нет! Сева — не твой!"'},
                {speaker: 'Дио', text: '"THE WORLD!" (время ненадолго останавливается)'}
            ],
            choices: [
                {text: '"Может, Сирены правы... Может, ему здесь лучше..."', emoji: '💔', nextScene: 'end_bad'},
                {text: '"Я буду сражаться!"', emoji: '🔥', nextScene: 'ch5_fight1'},
                {text: '"Сева! Сикс сэвен!"', emoji: '💬', nextScene: 'end_best'}
            ]
        },
        'ch5_fight1': {
            id: 'ch5_fight1',
            bg: 'throne',
            chapter: 5,
            characters: ['diana', 'shlyuhidze'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Раунд 1 vs Шлюхидзе\nИллюзия: Сева улыбается другому человеку.', isNarrator: true}
            ],
            choices: [
                {text: 'Ударить', emoji: '👊', nextScene: 'end_bad'},
                {text: 'Закрыть глаза и идти вперёд', emoji: '🙈', nextScene: 'ch5_fight2'}
            ]
        },
        'ch5_fight2': {
            id: 'ch5_fight2',
            bg: 'throne',
            chapter: 5,
            characters: ['diana', 'protitutidze'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Раунд 2 vs Протитутидзе\nОна бросается на Диану!', isNarrator: true}
            ],
            choices: [
                {text: 'Уклониться/Блокировать', emoji: '🛡️', nextScene: 'ch5_fight3'}
            ]
        },
        'ch5_fight3': {
            id: 'ch5_fight3',
            bg: 'throne',
            chapter: 5,
            characters: ['diana', 'tyolkidze'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Раунд 3 vs Тёлкидзе\nОна использует атаку заморозки времени!', isNarrator: true}
            ],
            choices: [
                {text: 'Сопротивляться', emoji: '⏳', nextScene: 'end_medium'}
            ]
        },
        'end_bad': {
            id: 'end_bad',
            bg: 'dark',
            chapter: 6,
            characters: ['diana'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Диана отвернулась. Сомнения заполнили её сердце.\nОна покинула замок, но обещала себе — однажды она вернётся.', isNarrator: true},
                {speaker: 'Рассказчик', text: '"Но Диана поклялась: это ещё не конец..."\n"Хочешь попробовать ещё раз?"', isNarrator: true}
            ],
            choices: [
                {text: 'Да', emoji: '🔄', nextScene: 'ch1_s1', effects: {reset: true}},
                {text: 'Нет', emoji: '🚪', nextScene: 'title_screen'}
            ]
        },
        'title_screen': {
            id: 'title_screen',
            bg: 'void',
            chapter: 0,
            characters: [],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Путь Дианы', isNarrator: true}
            ],
            choices: []
        },
        'end_medium': {
            id: 'end_medium',
            bg: 'sunrise',
            chapter: 6,
            characters: ['diana', 'seva'],
            dialogue: [
                {speaker: 'Рассказчик', text: 'Сирены побеждены, но Дио сбегает. Замок начинает рушиться.\nДиана хватает спящего Севу. Они спасаются, пока замок рушится.\nФинальная сцена: Диана и Сева сидят на холме, рассвет. Сева проснулся, но ослаблен.', isNarrator: true},
                {speaker: 'Сева', text: '"Диана...? Где я...?\nТы... спасла меня?"'},
                {speaker: 'Диана', text: '"Конечно, дурачок."'},
                {speaker: 'Рассказчик', text: 'Они обнимаются.', isNarrator: true},
                {speaker: 'Рассказчик', text: 'Сделано с любовью, Севой для Дианы 💜', isNarrator: true}
            ],
            choices: []
        },
        'end_best': {
            id: 'end_best',
            bg: 'garden',
            chapter: 6,
            characters: ['diana', 'seva', 'dio', 'jotaro'],
            dialogue: [
                {speaker: 'Диана', text: '"СЕВА! СИКС СЭВЕН!"'},
                {speaker: 'Рассказчик', text: 'Глаза Севы резко открываются. Магические цепи разбиваются вдребезги.', isNarrator: true},
                {speaker: 'Сева', text: '"Д... Диана?!\nСикс сэвен... Я помню..."'},
                {speaker: 'Дио', text: '"ЧТО?! Невозможно! Как ты—"'},
                {speaker: 'Джотаро', text: '"Yare yare daze. Твой номерок кончился, Дио.\nSTAR PLATINUM: THE WORLD!"'},
                {speaker: 'Рассказчик', text: 'Время останавливается. Star Platinum Джотаро разбивает тёмную магию Дио.\nСирены теряют силу и сбегают. Дио повержен.\nСева встает и подходит к Диане.', isNarrator: true},
                {speaker: 'Сева', text: '"Ты пришла за мной... через всё это...\nА можно друге? Гы гы."'},
                {speaker: 'Диана', text: '"...Выйдэс?"'},
                {speaker: 'Сева', text: '"Выйдэс. Навсегда."'},
                {speaker: 'Рассказчик', text: 'Они обнимаются. Всюду искрятся магические блестки. Замок превращается в прекрасный сад.', isNarrator: true},
                {speaker: 'Рассказчик', text: 'Сделано с бесконечной любовью 💜\nСева → Диана\nСикс Сэвен, навсегда.', isNarrator: true},
                {speaker: 'Джотаро', text: '"Yare yare daze..."'}
            ],
            choices: []
        }
    },
    chapterTitles: {
        1: '🔮 Глава 1: Тревожное свитка',
        2: '🌲 Глава 2: Тёмный лес',
        3: '🏰 Глава 3: Башня Кода',
        4: '⚔️ Глава 4: Мост и Стенд',
        5: '🏰 Глава 5: Замок Сирен',
        6: '🌟 Глава 6: Финал'
    },
    endings: {
        bad: {title: '💔 Плохая концовка', subtitle: 'Сомнения победили'},
        medium: {title: '🔥 Средняя концовка', subtitle: 'Спасен, но не до конца'},
        best: {title: '💜 Лучшая концовка', subtitle: 'Сикс Сэвен, навсегда'}
    }
};

class GameState {
    constructor() {
        this.currentScene = 'ch1_s1';
        this.dialogueIndex = 0;
        this.chapter = 1;
        this.inventory = [];
        this.courage = 0;
        this.hp = 3;
        this.maxHp = 3;
        this.flags = {};
    }

    addItem(item) {
        if (!this.inventory.includes(item)) {
            this.inventory.push(item);
        }
    }

    removeItem(item) {
        const index = this.inventory.indexOf(item);
        if (index > -1) {
            this.inventory.splice(index, 1);
        }
    }

    setFlag(flag) {
        this.flags[flag] = true;
    }

    hasFlag(flag) {
        return !!this.flags[flag];
    }

    addCourage(amount = 1) {
        this.courage += amount;
    }
}

// Helper functions for save/load to localStorage
function saveGame(state) {
    try {
        localStorage.setItem('dianaGameSave', JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save game state', e);
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem('dianaGameSave');
        if (saved) {
            const parsed = JSON.parse(saved);
            const state = new GameState();
            Object.assign(state, parsed);
            return state;
        }
    } catch (e) {
        console.error('Failed to load game state', e);
    }
    return new GameState();
}

// Scene definitions (Placeholders for Phaser to compile, since we only need the file setup)
class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    preload() { }
    create() {
        this.scene.start('GameScene');
        this.scene.start('UIScene');
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    create() { }
}

class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }
    create() { }
}

// Phaser config
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 480,
        height: 800
    },
    scene: [PreloadScene, GameScene, UIScene]
};

// const game = new Phaser.Game(config);
