// js/main.js — Game config + ALL story data for "Путь Дианы"

var GAME_DATA = {

    // ── Chapter titles ──────────────────────────────────────
    chapterTitles: {
        ch1: 'Глава 1: Тревожный свиток',
        ch2: 'Глава 2: Тёмный лес',
        ch3: 'Глава 3: Башня Кода',
        ch4: 'Глава 4: Мост и Стенд',
        ch5: 'Глава 5: Замок Сирен',
        ch6: 'Глава 6: Финал'
    },

    // ── Ending titles ───────────────────────────────────────
    endingTitles: {
        bad:    '💔 Плохая концовка — Осколки надежды',
        medium: '🔥 Средняя концовка — Победа через бой',
        best:   '💜 Лучшая концовка — Сикс Сэвен, навсегда'
    },

    // ── All scenes ──────────────────────────────────────────
    scenes: {

        // ═══════════════════════════════════════════════════
        // CHAPTER 1 — Тревожный свиток
        // ═══════════════════════════════════════════════════

        'ch1_opening': {
            id: 'ch1_opening',
            chapter: 'ch1',
            bg: 'cottage',
            characters: ['diana'],
            dialogue: [
                { speaker: '', text: 'Тихий вечер в маленьком домике на краю леса. Свечи мерцают, за окном шумят деревья.', isNarrator: true },
                { speaker: '', text: 'Ты — Диана, и сегодня что-то не так...', isNarrator: true },
                { speaker: 'Диана', text: 'Что-то тревожное чувство... Как будто что-то случилось.', emotion: 'worried', isThought: true }
            ],
            next: 'ch1_scroll_appears'
        },

        'ch1_scroll_appears': {
            id: 'ch1_scroll_appears',
            chapter: 'ch1',
            bg: 'cottage',
            characters: ['diana'],
            dialogue: [
                { speaker: '', text: 'На столе вспыхивает магический свет. Появляется свиток.', isNarrator: true },
                { speaker: 'Диана', text: 'Что это?! Свиток... От Севы!', emotion: 'surprised' },
                { speaker: '', text: 'Диана открывает свиток. Текст частично повреждён:', isNarrator: true },
                { speaker: 'Свиток', text: '«Диана... если ты это читаешь... меня увели... на север... замок... помог—»', emotion: 'corrupted' },
                { speaker: '', text: 'Текст обрывается.', isNarrator: true }
            ],
            choices: [
                {
                    text: '🗡️ Нужно идти немедленно!',
                    emoji: '🗡️',
                    nextScene: 'ch2_enter',
                    effects: { courage: 1 }
                },
                {
                    text: '📜 Подожди, попробую восстановить текст...',
                    emoji: '📜',
                    nextScene: 'ch2_enter',
                    effects: { addItem: 'Подсказка о Сиренах', setFlag: 'restored_text' }
                },
                {
                    text: '🏠 Может, соседи помогут?',
                    emoji: '🏠',
                    nextScene: 'ch2_enter',
                    effects: { addItem: 'Зелье исцеления', setFlag: 'visited_neighbors' }
                }
            ]
        },

        // ═══════════════════════════════════════════════════
        // CHAPTER 2 — Тёмный лес
        // ═══════════════════════════════════════════════════

        'ch2_enter': {
            id: 'ch2_enter',
            chapter: 'ch2',
            bg: 'forest',
            characters: ['diana'],
            dialogue: [
                { speaker: '', text: 'Тёмный лес окутывает тебя. Тропинка едва видна в свете луны.', isNarrator: true },
                { speaker: '', text: 'Ветви скрипят, что-то шуршит в кустах...', isNarrator: true },
                { speaker: 'Диана', text: 'Так темно... Но я должна идти дальше.', emotion: 'determined' }
            ],
            next: 'ch2_arsenius_appears'
        },

        'ch2_arsenius_appears': {
            id: 'ch2_arsenius_appears',
            chapter: 'ch2',
            bg: 'forest',
            characters: ['diana', 'arsenius'],
            dialogue: [
                { speaker: '', text: 'Из деревьев выходит ОГРОМНАЯ фигура. Доброе лицо, усы, широкая улыбка.', isNarrator: true },
                { speaker: 'Арсен Маркарян', text: 'А, мелкая! Ты куда одна-то? В лесу одному нельзя...', emotion: 'friendly' },
                { speaker: 'Арсен Маркарян', text: 'Ладно, не бойсь. Я — Арсенеус Макаряниус. Лесной барон.', emotion: 'proud' },
                { speaker: 'Арсен Маркарян', text: 'А можно друге? Гы гы.', emotion: 'smirk' },
                { speaker: 'Диана', text: 'Я ищу своего... друга. Его увели на север, к замку.', emotion: 'worried' },
                { speaker: 'Арсен Маркарян', text: 'К Замку Сирен?! Хм-м-м... Я видел, как три женщины тащили какого-то парня туда. Высокий такой, да?', emotion: 'thinking' },
                { speaker: 'Арсен Маркарян', text: 'Ох, мелкая, это опасно. Но я проводу тебя до развилки.', emotion: 'concerned' }
            ],
            choices: [
                {
                    text: '🤝 Пойдём вместе, Арсенеус!',
                    emoji: '🤝',
                    nextScene: 'ch3_enter',
                    effects: { addItem: 'Щит Барона', setFlag: 'arsenius_ally' }
                },
                {
                    text: '⚡ Спасибо, но я пойду напрямик через чащу!',
                    emoji: '⚡',
                    nextScene: 'ch3_enter',
                    effects: { courage: 1 }
                },
                {
                    text: '💬 Расскажи подробнее о Сиренах.',
                    emoji: '💬',
                    nextScene: 'ch3_enter',
                    effects: { addItem: 'Подсказка о Сиренах', setFlag: 'know_sirens' }
                }
            ]
        },

        // ═══════════════════════════════════════════════════
        // CHAPTER 3 — Башня Кода
        // ═══════════════════════════════════════════════════

        'ch3_enter': {
            id: 'ch3_enter',
            chapter: 'ch3',
            bg: 'tower',
            characters: ['diana'],
            dialogue: [
                { speaker: '', text: 'Поляна расступается, и ты видишь... башню. Но не обычную.', isNarrator: true },
                { speaker: '', text: 'Стены светятся рунами, похожими на... код? Экраны мерцают вместо окон.', isNarrator: true },
                { speaker: 'Диана', text: 'Что за место...?', emotion: 'curious' },
                { speaker: '', text: 'Изнутри раздаётся голос:', isNarrator: true },
                { speaker: '???' , text: 'Ошибка в строке 42... Нет, стоп, это же рекурсия... Ой, подождите!' }
            ],
            next: 'ch3_meet_viktor'
        },

        'ch3_meet_viktor': {
            id: 'ch3_meet_viktor',
            chapter: 'ch3',
            bg: 'tower',
            characters: ['diana', 'viktor', 'swapna'],
            dialogue: [
                { speaker: '', text: 'Появляется Виктор Голик — худощавый, со светящейся клавиатурой-посохом.', isNarrator: true },
                { speaker: 'Виктор Голик', text: 'О, Диана! Сева? Его увели? Я тут... ну, я магическую систему переписываю на новый стек.', emotion: 'excited' },
                { speaker: 'Виктор Голик', text: 'Но могу помочь! У меня тут кое-что есть...', emotion: 'helpful' },
                { speaker: '', text: 'Появляется Свапна — спокойная, с целебным сиянием.', isNarrator: true },
                { speaker: 'Свапна', text: 'Диана, я дам тебе зелье исцеления. Тебе оно пригодится.', emotion: 'kind' },
                { speaker: 'Свапна', text: 'И запомни: Сирены питаются сомнениями. Если ты уверена в себе — их магия бессильна.', emotion: 'wise' },
                { speaker: 'Виктор Голик', text: 'А я могу дать тебе Хакерский Артефакт. Он нарушает магические барьеры. Ну, технически магия — это просто API...', emotion: 'nerdy' }
            ],
            choices: [
                {
                    text: '💻 Дай мне Артефакт!',
                    emoji: '💻',
                    nextScene: 'ch4_bridge',
                    effects: { addItem: 'Хакерский Артефакт' }
                },
                {
                    text: '🌸 Научи меня заклинанию защиты!',
                    emoji: '🌸',
                    nextScene: 'ch4_bridge',
                    effects: { addItem: 'Заклинание защиты' }
                },
                {
                    text: '🤷 Спасибо, но я должна идти!',
                    emoji: '🤷',
                    nextScene: 'ch4_bridge',
                    effects: { courage: 1 }
                }
            ]
        },

        // ═══════════════════════════════════════════════════
        // CHAPTER 4 — Мост и Стенд
        // ═══════════════════════════════════════════════════

        'ch4_bridge': {
            id: 'ch4_bridge',
            chapter: 'ch4',
            bg: 'bridge',
            characters: ['diana'],
            dialogue: [
                { speaker: '', text: 'Дорога к замку преграждена. Разрушенный мост над чёрной бездной.', isNarrator: true },
                { speaker: '', text: 'На другой стороне — огромный тролль-стражник.', isNarrator: true },
                { speaker: 'Тролль', text: 'Стой! Не пройдёшь без ответов! Три загадки — или назад!' }
            ],
            next: 'ch4_riddle1'
        },

        'ch4_riddle1': {
            id: 'ch4_riddle1',
            chapter: 'ch4',
            bg: 'bridge',
            characters: ['diana'],
            dialogue: [
                { speaker: 'Тролль', text: 'В каком городе родился тот, кого ты ищешь?' }
            ],
            choices: [
                { text: 'Вроцлав', emoji: '🏙️', nextScene: 'ch4_riddle1_fail' },
                { text: 'Майнц', emoji: '🏙️', nextScene: 'ch4_riddle1_fail' },
                { text: 'Донецк', emoji: '🏙️', nextScene: 'ch4_riddle2', effects: { setFlag: 'riddle1_correct' } },
                { text: 'Варшава', emoji: '🏙️', nextScene: 'ch4_riddle1_fail' }
            ]
        },

        'ch4_riddle1_fail': {
            id: 'ch4_riddle1_fail',
            chapter: 'ch4',
            bg: 'bridge',
            characters: ['diana'],
            dialogue: [
                { speaker: 'Тролль', text: 'Ха! Не знаешь даже, откуда он? Попробуй ещё.' }
            ],
            next: 'ch4_riddle1'
        },

        'ch4_riddle2': {
            id: 'ch4_riddle2',
            chapter: 'ch4',
            bg: 'bridge',
            characters: ['diana'],
            dialogue: [
                { speaker: 'Тролль', text: 'Хм... Ладно, первое зачёт.' },
                { speaker: 'Тролль', text: 'Второй вопрос! Реши уравнение: 4x + 16 = 44. Чему равен x?' }
            ],
            choices: [
                { text: '5', emoji: '🔢', nextScene: 'ch4_riddle2_fail' },
                { text: '7', emoji: '🔢', nextScene: 'ch4_riddle3', effects: { setFlag: 'riddle2_correct' } },
                { text: '10', emoji: '🔢', nextScene: 'ch4_riddle2_fail' },
                { text: '12', emoji: '🔢', nextScene: 'ch4_riddle2_fail' }
            ]
        },

        'ch4_riddle2_fail': {
            id: 'ch4_riddle2_fail',
            chapter: 'ch4',
            bg: 'bridge',
            characters: ['diana'],
            dialogue: [
                { speaker: 'Тролль', text: 'Думай лучше!' }
            ],
            next: 'ch4_riddle2'
        },

        'ch4_riddle3': {
            id: 'ch4_riddle3',
            chapter: 'ch4',
            bg: 'bridge',
            characters: ['diana'],
            dialogue: [
                { speaker: 'Тролль', text: 'Ха, неплохо для авантюристки.' },
                { speaker: 'Тролль', text: 'Последний вопрос, путница. Самый важный.' },
                { speaker: 'Тролль', text: 'Что для тебя Сева?' }
            ],
            // free text — any answer accepted
            choices: [
                { text: 'Он — всё для меня', emoji: '💜', nextScene: 'ch4_riddle3_pass', effects: { setFlag: 'riddle3_correct' } },
                { text: 'Лучший человек на свете', emoji: '💜', nextScene: 'ch4_riddle3_pass', effects: { setFlag: 'riddle3_correct' } },
                { text: 'Моя любовь', emoji: '💜', nextScene: 'ch4_riddle3_pass', effects: { setFlag: 'riddle3_correct' } },
                { text: 'Я просто хочу его спасти', emoji: '💜', nextScene: 'ch4_riddle3_pass', effects: { setFlag: 'riddle3_correct' } }
            ]
        },

        'ch4_riddle3_pass': {
            id: 'ch4_riddle3_pass',
            chapter: 'ch4',
            bg: 'bridge',
            characters: ['diana'],
            dialogue: [
                { speaker: 'Тролль', text: 'Хммм... серьёзно? Ладно, вижу — ты отвечаешь сердцем. Проходи.' },
                { speaker: '', text: 'Мост магическим образом восстанавливается. Диана переходит на другую сторону.', isNarrator: true }
            ],
            next: 'ch4_jotaro'
        },

        'ch4_jotaro': {
            id: 'ch4_jotaro',
            chapter: 'ch4',
            bg: 'bridge',
            characters: ['diana', 'jotaro'],
            dialogue: [
                { speaker: '', text: 'За мостом, прислонившись к мёртвому дереву, стоит фигура.', isNarrator: true },
                { speaker: '', text: 'Высокий мужчина в школьной форме и шляпе. За ним мерцает призрачная синяя фигура — Стар Платинум.', isNarrator: true },
                { speaker: 'Джотаро Куджо', text: 'Yare yare daze...', emotion: 'calm' },
                { speaker: 'Джотаро Куджо', text: 'Ты тоже идёшь к замку? На Сирен?', emotion: 'serious' },
                { speaker: 'Диана', text: 'Да! Они забрали моего...', emotion: 'determined' },
                { speaker: 'Джотаро Куджо', text: 'Понял. Я тоже имею счёты кое с кем там.' },
                { speaker: 'Джотаро Куджо', text: '...Дио. Он стоит за всем этим.' },
                { speaker: 'Джотаро Куджо', text: 'Ладно. Идём вместе.' }
            ],
            choices: [
                {
                    text: '⭐ Спасибо, Джотаро! Давай вместе!',
                    emoji: '⭐',
                    nextScene: 'ch5_enter',
                    effects: { addItem: 'Звезда Платинума', setFlag: 'jotaro_ally' }
                },
                {
                    text: '🤔 Кто такой Дио?',
                    emoji: '🤔',
                    nextScene: 'ch5_enter',
                    effects: { setFlag: 'knows_dio' }
                },
                {
                    text: '💪 Я справлюсь сама!',
                    emoji: '💪',
                    nextScene: 'ch5_enter',
                    effects: { courage: 1 }
                }
            ]
        },

        // ═══════════════════════════════════════════════════
        // CHAPTER 5 — Замок Сирен
        // ═══════════════════════════════════════════════════

        'ch5_enter': {
            id: 'ch5_enter',
            chapter: 'ch5',
            bg: 'castle',
            characters: ['diana'],
            dialogue: [
                { speaker: '', text: 'Замок Сирен возвышается перед тобой. Чёрные шпили, фиолетовое свечение.', isNarrator: true },
                { speaker: '', text: 'Внутри — красота и опасность. Зеркала отражают не то, что есть на самом деле.', isNarrator: true },
                { speaker: 'Диана', text: 'Сева... Я иду.', emotion: 'determined' }
            ],
            next: 'ch5_sirens_appear'
        },

        'ch5_sirens_appear': {
            id: 'ch5_sirens_appear',
            chapter: 'ch5',
            bg: 'throne',
            characters: ['diana', 'siren1', 'siren2', 'siren3'],
            dialogue: [
                { speaker: '', text: 'Три Сирены появляются в тронном зале. Сева лежит на пьедестале, спящий, окружённый магическими цепями.', isNarrator: true },
                { speaker: 'Шлюхидзе', text: 'О, какая милая гостья! Пришла забрать нашего пленника?', emotion: 'mocking' },
                { speaker: 'Шлюхидзе', text: 'Он о тебе и не вспоминал... Здесь ему хорошо.', emotion: 'cruel' },
                { speaker: 'Протитутидзе', text: 'Слабак! Ты не пройдёшь через нас!', emotion: 'angry' },
                { speaker: 'Тёлкидзе', text: 'Время здесь работает по моим правилам. Ты уже опоздала.', emotion: 'cold' },
                { speaker: 'Диана', text: 'Отпустите его! Это не ваше право!', emotion: 'angry' }
            ],
            next: 'ch5_dio_appears'
        },

        'ch5_dio_appears': {
            id: 'ch5_dio_appears',
            chapter: 'ch5',
            bg: 'throne',
            characters: ['diana', 'dio'],
            dialogue: [
                { speaker: '', text: 'Тёмная фигура материализуется за Сиренами. Блондин, мускулистый, со зловещей улыбкой.', isNarrator: true },
                { speaker: 'Дио', text: 'Хо-хо... Ты пришла? Какая храбрая маленькая девочка.', emotion: 'arrogant' },
                { speaker: 'Дио', text: 'Ты думаешь, ты можешь изменить судьбу? Невежественное дитя...', emotion: 'menacing' },
                { speaker: 'Дио', text: 'Этот мир принадлежит МНЕ. И этот юноша — тоже.', emotion: 'possessive' },
                { speaker: 'Диана', text: 'Нет! Сева — не твой!', emotion: 'defiant' },
                { speaker: 'Дио', text: 'THE WORLD!', emotion: 'frozen' },
                { speaker: '', text: 'Время замирает на мгновение.', isNarrator: true }
            ],
            choices: [
                {
                    text: '💔 Может, Сирены правы... Может, ему здесь лучше...',
                    emoji: '💔',
                    nextScene: 'ending_bad'
                },
                {
                    text: '🔥 Я буду сражаться!',
                    emoji: '🔥',
                    nextScene: 'ending_medium_1'
                },
                {
                    text: '💬 СЕВА! СИКС СЭВЕН!',
                    emoji: '💬',
                    nextScene: 'ending_best'
                }
            ]
        },

        // ═══════════════════════════════════════════════════
        // CHAPTER 6 — Финал
        // ═══════════════════════════════════════════════════

        // ── BAD ENDING ──
        'ending_bad': {
            id: 'ending_bad',
            chapter: 'ch6',
            ending: 'bad',
            bg: 'castle',
            characters: ['diana'],
            dialogue: [
                { speaker: '', text: 'Диана отвернулась. Сомнения заполнили её сердце.', isNarrator: true },
                { speaker: '', text: 'Она покинула замок, но обещала себе — однажды она вернётся.', isNarrator: true },
                { speaker: '', text: 'Но Диана поклялась: это ещё не конец...', isNarrator: true },
                { speaker: '', text: 'Хочешь попробовать ещё раз?', isNarrator: true }
            ],
            choices: [
                { text: '🔄 Да, начать заново', emoji: '🔄', nextScene: 'ch1_opening' }
            ]
        },

        // ── MEDIUM ENDING (combat) ──
        'ending_medium_1': {
            id: 'ending_medium_1',
            chapter: 'ch6',
            bg: 'throne',
            characters: ['diana', 'siren1'],
            dialogue: [
                { speaker: '', text: 'Диана принимает боевую стойку!', isNarrator: true },
                { speaker: 'Шлюхидзе', text: 'Ха-ха... Посмотрим, как ты сражешься с иллюзиями!', emotion: 'mocking' },
                { speaker: '', text: 'Перед глазами Дианы возникает иллюзия: Сева улыбается другому человеку...', isNarrator: true }
            ],
            choices: [
                {
                    text: '👁️ Закрыть глаза и идти вперёд',
                    emoji: '👁️',
                    nextScene: 'ending_medium_2',
                    effects: { setFlag: 'broke_illusion' }
                },
                {
                    text: '⚔️ Ударить!',
                    emoji: '⚔️',
                    nextScene: 'ending_medium_2'
                }
            ]
        },

        'ending_medium_2': {
            id: 'ending_medium_2',
            chapter: 'ch6',
            bg: 'throne',
            characters: ['diana', 'siren2'],
            dialogue: [
                { speaker: '', text: 'Иллюзии рассеиваются! Шлюхидзе отступает.', isNarrator: true },
                { speaker: 'Протитутидзе', text: 'Ну ничего! А вот это отразишь?!', emotion: 'angry' },
                { speaker: '', text: 'Протитутидзе бросается на Диану!', isNarrator: true }
            ],
            next: 'ending_medium_3'
        },

        'ending_medium_3': {
            id: 'ending_medium_3',
            chapter: 'ch6',
            bg: 'throne',
            characters: ['diana', 'siren3'],
            dialogue: [
                { speaker: 'Тёлкидзе', text: 'Время — моя стихия! Замри!', emotion: 'cold' },
                { speaker: '', text: 'Время вокруг Дианы начинает замедляться...', isNarrator: true }
            ],
            next: 'ending_medium_win'
        },

        'ending_medium_win': {
            id: 'ending_medium_win',
            chapter: 'ch6',
            ending: 'medium',
            bg: 'sunrise',
            characters: ['diana', 'seva'],
            dialogue: [
                { speaker: '', text: 'Сирены побеждены, но Дио сбегает. Замок начинает рушиться!', isNarrator: true },
                { speaker: '', text: 'Диана хватает спящего Севу. Они выбираются наружу, пока замок рассыпается.', isNarrator: true },
                { speaker: '', text: 'Рассвет. Диана и Сева сидят на холме. Сева просыпается, но ещё затуманен.', isNarrator: true },
                { speaker: 'Сева', text: 'Диана...? Где я...?', emotion: 'confused' },
                { speaker: 'Сева', text: 'Ты... спасла меня?', emotion: 'touched' },
                { speaker: 'Диана', text: 'Конечно, дурачок.', emotion: 'smiling' },
                { speaker: '', text: '💜 Сделано с любовью, Севой для Дианы 💜', isNarrator: true }
            ],
            choices: [
                { text: '🔄 Хочешь увидеть лучшую концовку?', emoji: '🔄', nextScene: 'ch1_opening' }
            ]
        },

        // ── BEST ENDING ──
        'ending_best': {
            id: 'ending_best',
            chapter: 'ch6',
            bg: 'throne',
            characters: ['diana', 'seva', 'jotaro', 'dio'],
            dialogue: [
                { speaker: 'Диана', text: 'СЕВА! СИКС СЭВЕН!', emotion: 'screaming' },
                { speaker: '', text: 'Глаза Севы распахиваются. Магические цепи разлетаются в щепки!', isNarrator: true },
                { speaker: 'Сева', text: 'Д... Диана?!', emotion: 'awake' },
                { speaker: 'Сева', text: 'Сикс сэвен... Я помню...', emotion: 'emotional' },
                { speaker: 'Дио', text: 'ЧТО?! Невозможно! Как ты—', emotion: 'shocked' },
                { speaker: 'Джотаро Куджо', text: 'Yare yare daze. Твой номерок кончился, Дио.', emotion: 'cool' },
                { speaker: 'Джотаро Куджо', text: 'STAR PLATINUM: THE WORLD!', emotion: 'shouting' },
                { speaker: '', text: 'Время останавливается. Стар Платинум рассеивает тёмную магию Дио.', isNarrator: true },
                { speaker: '', text: 'Сиpены теряют силу и обращаются в бегство. Дио побеждён.', isNarrator: true }
            ],
            next: 'ending_best_after'
        },

        'ending_best_after': {
            id: 'ending_best_after',
            chapter: 'ch6',
            ending: 'best',
            bg: 'garden',
            characters: ['diana', 'seva'],
            dialogue: [
                { speaker: '', text: 'Сева подходит к Диане. Замок превращается в прекрасный сад.', isNarrator: true },
                { speaker: 'Сева', text: 'Ты пришла за мной... через всё это...', emotion: 'emotional' },
                { speaker: 'Сева', text: 'А можно друге? Гы гы.', emotion: 'smiling' },
                { speaker: 'Диана', text: '...Выйдэс?', emotion: 'teasing' },
                { speaker: 'Сева', text: 'Выйдэс. Навсегда.', emotion: 'loving' },
                { speaker: '', text: 'Они обнимаются. Магические искры повсюду.', isNarrator: true },
                { speaker: '', text: '💜 Сделано с бесконечной любовью 💜', isNarrator: true },
                { speaker: '', text: 'Сева → Диана', isNarrator: true },
                { speaker: '', text: 'Сикс Сэвен, навсегда.', isNarrator: true },
                { speaker: '', text: '───────────────', isNarrator: true },
                { speaker: '', text: 'Джотаро уходит в закат.', isNarrator: true },
                { speaker: 'Джотаро Куджо', text: 'Yare yare daze...', emotion: 'calm' },
                { speaker: '', text: '[THE END]', isNarrator: true }
            ],
            choices: [
                { text: '🔄 Пройти ещё раз', emoji: '🔄', nextScene: 'ch1_opening' }
            ]
        }
    }
};

// ── Phaser game config ──────────────────────────────────

var config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 480,
    height: 800,
    backgroundColor: '#0a0a12',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [PreloadScene, GameScene, UIScene]
};

var game = new Phaser.Game(config);
