(() => {
    "use strict"
    module.exports = () => {

        let inquiries = [

        ];


        const Countries = [
            {
                "id": 643,
                "name": "Россия"
            },
            {
                "id": 0,
                "name": "Без гражданства"
            },
            {
                "id": 895,
                "name": "Абхазия"
            },
            {
                "id": 36,
                "name": "Австралия"
            },
            {
                "id": 40,
                "name": "Австрия"
            },
            {
                "id": 31,
                "name": "Азербайджан"
            },
            {
                "id": 8,
                "name": "Албания"




            },
            {
                "id": 12,
                "name": "Алжир"
            },
            {
                "id": 16,
                "name": "Американское Самоа"




            },
            {
                "id": 660,
                "name": "Ангилья"




            },
            {
                "id": 24,
                "name": "Ангола"




            },
            {
                "id": 20,
                "name": "Андорра"




            },
            {
                "id": 10,
                "name": "Антарктида"




            },
            {
                "id": 28,
                "name": "Антигуа И Барбуда"




            },
            {
                "id": 32,
                "name": "Аргентина"




            },
            {
                "id": 51,
                "name": "Армения"




            },
            {
                "id": 533,
                "name": "Аруба"




            },
            {
                "id": 4,
                "name": "Афганистан"




            },
            {
                "id": 44,
                "name": "Багамы"




            },
            {
                "id": 50,
                "name": "Бангладеш"




            },
            {
                "id": 52,
                "name": "Барбадос"




            },
            {
                "id": 48,
                "name": "Бахрейн"




            },
            {
                "id": 112,
                "name": "Беларусь"




            },
            {
                "id": 84,
                "name": "Белиз"




            },
            {
                "id": 56,
                "name": "Бельгия"




            },
            {
                "id": 204,
                "name": "Бенин"




            },
            {
                "id": 60,
                "name": "Бермуды"




            },
            {
                "id": 100,
                "name": "Болгария"




            },
            {
                "id": 68,
                "name": "Боливия"




            },
            {
                "id": 535,
                "name": "Бонэйр, Синт-эстатиус И Саба"




            },
            {
                "id": 70,
                "name": "Босния и Герцеговина"




            },
            {
                "id": 72,
                "name": "Ботсвана"




            },
            {
                "id": 76,
                "name": "Бразилия"




            },
            {
                "id": 86,
                "name": "Британская Территория в Индийском Океане"




            },
            {
                "id": 96,
                "name": "Бруней-даруссалам"




            },
            {
                "id": 854,
                "name": "Буркина-фасо"




            },
            {
                "id": 108,
                "name": "Бурунди"




            },
            {
                "id": 64,
                "name": "Бутан"




            },
            {
                "id": 548,
                "name": "Вануату"




            },
            {
                "id": 348,
                "name": "Венгрия"




            },
            {
                "id": 862,
                "name": "Венесуэла"




            },
            {
                "id": 92,
                "name": "Виргинские Острова, Британские"




            },
            {
                "id": 850,
                "name": "Виргинские Острова, Сша"




            },
            {
                "id": 704,
                "name": "Вьетнам"




            },
            {
                "id": 266,
                "name": "Габон"




            },
            {
                "id": 332,
                "name": "Гаити"




            },
            {
                "id": 328,
                "name": "Гайана"




            },
            {
                "id": 270,
                "name": "Гамбия"




            },
            {
                "id": 288,
                "name": "Гана"




            },
            {
                "id": 312,
                "name": "Гваделупа"




            },
            {
                "id": 320,
                "name": "Гватемала"




            },
            {
                "id": 324,
                "name": "Гвинея"




            },
            {
                "id": 624,
                "name": "Гвинея-бисау"




            },
            {
                "id": 276,
                "name": "Германия"




            },
            {
                "id": 831,
                "name": "Гернси"




            },
            {
                "id": 292,
                "name": "Гибралтар"




            },
            {
                "id": 340,
                "name": "Гондурас"




            },
            {
                "id": 344,
                "name": "Гонконг"




            },
            {
                "id": 308,
                "name": "Гренада"




            },
            {
                "id": 304,
                "name": "Гренландия"




            },
            {
                "id": 300,
                "name": "Греция"




            },
            {
                "id": 268,
                "name": "Грузия"




            },
            {
                "id": 316,
                "name": "Гуам"




            },
            {
                "id": 208,
                "name": "Дания"




            },
            {
                "id": 832,
                "name": "Джерси"




            },
            {
                "id": 262,
                "name": "Джибути"




            },
            {
                "id": 212,
                "name": "Доминика"




            },
            {
                "id": 214,
                "name": "Доминиканская Республика"




            },
            {
                "id": 818,
                "name": "Египет"




            },
            {
                "id": 894,
                "name": "Замбия"




            },
            {
                "id": 732,
                "name": "Западная Сахара"




            },
            {
                "id": 716,
                "name": "Зимбабве"




            },
            {
                "id": 376,
                "name": "Израиль"




            },
            {
                "id": 356,
                "name": "Индия"




            },
            {
                "id": 360,
                "name": "Индонезия"




            },
            {
                "id": 400,
                "name": "Иордания"




            },
            {
                "id": 368,
                "name": "Ирак"




            },
            {
                "id": 364,
                "name": "Иран, Исламская Республика"




            },
            {
                "id": 372,
                "name": "Ирландия"




            },
            {
                "id": 352,
                "name": "Исландия"




            },
            {
                "id": 724,
                "name": "Испания"




            },
            {
                "id": 380,
                "name": "Италия"




            },
            {
                "id": 887,
                "name": "Йемен"




            },
            {
                "id": 132,
                "name": "Кабо-верде"




            },
            {
                "id": 398,
                "name": "Казахстан"




            },
            {
                "id": 116,
                "name": "Камбоджа"




            },
            {
                "id": 120,
                "name": "Камерун"




            },
            {
                "id": 124,
                "name": "Канада"




            },
            {
                "id": 634,
                "name": "Катар"




            },
            {
                "id": 404,
                "name": "Кения"




            },
            {
                "id": 196,
                "name": "Кипр"




            },
            {
                "id": 417,
                "name": "Киргизия"




            },
            {
                "id": 296,
                "name": "Кирибати"




            },
            {
                "id": 156,
                "name": "Китай"




            },
            {
                "id": 166,
                "name": "Кокосовые (килинг) Острова"




            },
            {
                "id": 170,
                "name": "Колумбия"




            },
            {
                "id": 174,
                "name": "Коморы"




            },
            {
                "id": 178,
                "name": "Конго"




            },
            {
                "id": 180,
                "name": "Конго, Демократическая Республика"




            },
            {
                "id": 408,
                "name": "Корея, Народно-демократическая Республика"




            },
            {
                "id": 410,
                "name": "Республика Корея"




            },
            {
                "id": 188,
                "name": "Республика Коста-рика"




            },
            {
                "id": 384,
                "name": "Республика Кот Д'ивуар"




            },
            {
                "id": 192,
                "name": "Республика Куба"




            },
            {
                "id": 414,
                "name": "Государство Кувейт"




            },
            {
                "id": 531,
                "name": "Кюрасао"




            },
            {
                "id": 418,
                "name": "Лаосская Народно-демократическая Республика"




            },
            {
                "id": 428,
                "name": "Латвийская Республика"




            },
            {
                "id": 426,
                "name": "Королевство Лесото"




            },
            {
                "id": 430,
                "name": "Республика Либерия"




            },
            {
                "id": 422,
                "name": "Ливанская Республика"




            },
            {
                "id": 434,
                "name": "Ливия"




            },
            {
                "id": 440,
                "name": "Литовская Республика"




            },
            {
                "id": 438,
                "name": "Княжество Лихтенштейн"




            },
            {
                "id": 442,
                "name": "Великое Герцогство Люксембург"




            },
            {
                "id": 480,
                "name": "Республика Маврикий"




            },
            {
                "id": 478,
                "name": "Исламская Республика Мавритания"




            },
            {
                "id": 450,
                "name": "Республика Мадагаскар"




            },
            {
                "id": 175,
                "name": "Майотта"




            },
            {
                "id": 446,
                "name": "Макао"




            },
            {
                "id": 807,
                "name": "Республика Македония"




            },
            {
                "id": 454,
                "name": "Республика Малави"




            },
            {
                "id": 458,
                "name": "Малайзия"




            },
            {
                "id": 466,
                "name": "Республика Мали"




            },
            {
                "id": 581,
                "name": "Малые Тихоокеанские Отдаленные Острова Сша"




            },
            {
                "id": 462,
                "name": "Мальдивская Республика"




            },
            {
                "id": 470,
                "name": "Республика Мальта"




            },
            {
                "id": 504,
                "name": "Королевство Марокко"




            },
            {
                "id": 474,
                "name": "Мартиника"




            },
            {
                "id": 584,
                "name": "Республика Маршалловы Острова"




            },
            {
                "id": 484,
                "name": "Мексиканские Соединенные Штаты"




            },
            {
                "id": 583,
                "name": "Федеративные Штаты Микронезии"




            },
            {
                "id": 508,
                "name": "Республика Мозамбик"




            },
            {
                "id": 498,
                "name": "Республика Молдова"




            },
            {
                "id": 492,
                "name": "Княжество Монако"




            },
            {
                "id": 496,
                "name": "Монголия"




            },
            {
                "id": 500,
                "name": "Монтсеррат"




            },
            {
                "id": 104,
                "name": "Республика Союза Мьянма"




            },
            {
                "id": 516,
                "name": "Республика Намибия"




            },
            {
                "id": 520,
                "name": "Республика Науру"




            },
            {
                "id": 524,
                "name": "Непал"




            },
            {
                "id": 562,
                "name": "Республика Нигер"




            },
            {
                "id": 566,
                "name": "Федеративная Республика Нигерия"




            },
            {
                "id": 528,
                "name": "Королевство Нидерландов"




            },
            {
                "id": 558,
                "name": "Республика Никарагуа"




            },
            {
                "id": 570,
                "name": "Ниуэ"




            },
            {
                "id": 554,
                "name": "Новая Зеландия"




            },
            {
                "id": 540,
                "name": "Новая Каледония"




            },
            {
                "id": 578,
                "name": "Королевство Норвегия"




            },
            {
                "id": 784,
                "name": "Объединенные Арабские Эмираты"




            },
            {
                "id": 512,
                "name": "Султанат Оман"




            },
            {
                "id": 136,
                "name": "Острова Кайман"




            },
            {
                "id": 184,
                "name": "Острова Кука"




            },
            {
                "id": 796,
                "name": "Острова Теркс И Кайкос"




            },
            {
                "id": 74,
                "name": "Остров Буве"




            },
            {
                "id": 833,
                "name": "Остров Мэн"




            },
            {
                "id": 574,
                "name": "Остров Норфолк"




            },
            {
                "id": 162,
                "name": "Остров Рождества"




            },
            {
                "id": 334,
                "name": "Остров Херд И Острова Макдональд"




            },
            {
                "id": 586,
                "name": "Исламская Республика Пакистан"




            },
            {
                "id": 585,
                "name": "Республика Палау"




            },
            {
                "id": 275,
                "name": "Государство Палестина"




            },
            {
                "id": 591,
                "name": "Республика Панама"




            },
            {
                "id": 336,
                "name": "Государство - Город Ватикан"




            },
            {
                "id": 598,
                "name": "Папуа Новая Гвинея"




            },
            {
                "id": 600,
                "name": "Республика Парагвай"




            },
            {
                "id": 604,
                "name": "Республика Перу"




            },
            {
                "id": 612,
                "name": "Питкерн"




            },
            {
                "id": 616,
                "name": "Республика Польша"




            },
            {
                "id": 620,
                "name": "Португальская Республика"




            },
            {
                "id": 630,
                "name": "Пуэрто-рико"




            },
            {
                "id": 638,
                "name": "Реюньон"




            },
            {
                "id": 646,
                "name": "Руандийская Республика"




            },
            {
                "id": 642,
                "name": "Румыния"




            },
            {
                "id": 882,
                "name": "Независимое Государство Самоа"




            },
            {
                "id": 674,
                "name": "Республика Сан-марино"




            },
            {
                "id": 678,
                "name": "Сан-томе И Принсипи"




            },
            {
                "id": 682,
                "name": "Королевство Саудовская Аравия"




            },
            {
                "id": 748,
                "name": "Королевство Свазиленд"




            },
            {
                "id": 654,
                "name": "Святая Елена, Остров Вознесения, Тристан-да-кунья"




            },
            {
                "id": 580,
                "name": "Северные Марианские Острова"




            },
            {
                "id": 690,
                "name": "Республика Сейшелы"




            },
            {
                "id": 652,
                "name": "Сен-бартелеми"




            },
            {
                "id": 663,
                "name": "Сен-мартен"




            },
            {
                "id": 534,
                "name": "Сен-мартен (нидерландская часть)",




            },
            {
                "id": 686,
                "name": "Республика Сенегал"




            },
            {
                "id": 670,
                "name": "Сент-винсент И Гренадины"




            },
            {
                "id": 659,
                "name": "Сент-китс И Невис"




            },
            {
                "id": 662,
                "name": "Сент-люсия"




            },
            {
                "id": 666,
                "name": "Сент-пьер И Микелон"




            },
            {
                "id": 688,
                "name": "Республика Сербия"




            },
            {
                "id": 702,
                "name": "Республика Сингапур"




            },
            {
                "id": 760,
                "name": "Сирийская Арабская Республика"




            },
            {
                "id": 703,
                "name": "Словацкая Республика"




            },
            {
                "id": 705,
                "name": "Республика Словения"




            },
            {
                "id": 826,
                "name": "Соединенное Королевство"




            },
            {
                "id": 840,
                "name": "Сша"




            },
            {
                "id": 90,
                "name": "Соломоновы Острова"




            },
            {
                "id": 706,
                "name": "Федеративная Республика Сомали"




            },
            {
                "id": 729,
                "name": "Республика Судан"




            },
            {
                "id": 740,
                "name": "Республика Суринам"




            },
            {
                "id": 694,
                "name": "Республика Сьерра-леоне"




            },
            {
                "id": 762,
                "name": "Республика Таджикистан"




            },
            {
                "id": 764,
                "name": "Королевство Таиланд"




            },
            {
                "id": 158,
                "name": "Тайвань (китай)",




            },
            {
                "id": 834,
                "name": "Объединенная Республика Танзания"




            },
            {
                "id": 626,
                "name": "Тимор-лесте"




            },
            {
                "id": 768,
                "name": "Тоголезская Республика"




            },
            {
                "id": 772,
                "name": "Токелау"




            },
            {
                "id": 776,
                "name": "Королевство Тонга"




            },
            {
                "id": 780,
                "name": "Республика Тринидад и Тобаго"




            },
            {
                "id": 798,
                "name": "Тувалу"




            },
            {
                "id": 788,
                "name": "Тунисская Республика"




            },
            {
                "id": 795,
                "name": "Туркменистан"




            },
            {
                "id": 792,
                "name": "Турция"




            },
            {
                "id": 800,
                "name": "Республика Уганда"




            },
            {
                "id": 860,
                "name": "Узбекистан"
            },
            {
                "id": 804,
                "name": "Украина"
            },
            {
                "id": 876,
                "name": "Уоллис И Футуна"
            },
            {
                "id": 858,
                "name": "Уругвай"
            },
            {
                "id": 234,
                "name": "Фарерские Острова"
            },
            {
                "id": 242,
                "name": "Республика Фиджи"
            },
            {
                "id": 608,
                "name": "Республика Филиппины"
            },
            {
                "id": 246,
                "name": "Финляндская Республика"
            },
            {
                "id": 238,
                "name": "Фолклендские Острова (мальвинские)",
            },
            {
                "id": 250,
                "name": "Французская Республика"
            },
            {
                "id": 254,
                "name": "Французская Гвиана"
            },
            {
                "id": 258,
                "name": "Французская Полинезия"
            },
            {
                "id": 260,
                "name": "Французские Южные Территории"
            },
            {
                "id": 191,
                "name": "Республика Хорватия"
            },
            {
                "id": 140,
                "name": "Центрально-африканская Республика"
            },
            {
                "id": 148,
                "name": "Республика Чад"
            },
            {
                "id": 499,
                "name": "Черногория"
            },
            {
                "id": 203,
                "name": "Чешская Республика"
            },
            {
                "id": 152,
                "name": "Республика Чили"
            },
            {
                "id": 756,
                "name": "Швейцарская Конфедерация"
            },
            {
                "id": 752,
                "name": "Королевство Швеция"
            },
            {
                "id": 744,
                "name": "Шпицберген и Ян Майен"
            },
            {
                "id": 144,
                "name": "Шри-ланка"
            },
            {
                "id": 218,
                "name": "Республика Эквадор"
            },
            {
                "id": 226,
                "name": "Экваториальная Гвинея"
            },
            {
                "id": 248,
                "name": "Эландские Острова"
            },
            {
                "id": 222,
                "name": "Республика Эль-сальвадор"
            },
            {
                "id": 232,
                "name": "Государство Эритрея"
            },
            {
                "id": 233,
                "name": "Эстония"
            },
            {
                "id": 231,
                "name": "Эфиопия"
            },
            {
                "id": 710,
                "name": "Южно-африканская Республика"
            },
            {
                "id": 239,
                "name": "Южная Джорджия и Южные Сандвичевы Острова"
            },
            {
                "id": 896,
                "name": "Республика Южная Осетия"
            },
            {
                "id": 728,
                "name": "Республика Южный Судан"
            },
            {
                "id": 388,
                "name": "Ямайка"
            },
            {
                "id": 392,
                "name": "Япония"
            }
        ]
        const EducProgramType = {
            Other: 0,
            Preschool: 1,
            School: 2,
            Prof: 3,
            RestAndRecovery: 4,
            AddEducation: 5,
        }



        let statuses = [
            { id: "935F8E2C-69F5-46EF-975F-A452002D5F40", name: "Новое" },
            { id: "81E1C045-4357-4031-9856-A452002D5FFB", name: "Очередник" },
            { id: "7D87390B-BCCE-456E-BF12-A452002D6005", name: "Отмена" },
        ]
        let relationTypes = [
            { id: "26B732C2-580D-4FCC-8034-A88F01009735", name: "Отец", confirmationDocument: false },
            { id: "4575BF75-EF7C-4A82-B8F5-A88F01009735", name: "Мать", confirmationDocument: false },
            { id: "2DD2F703-28C6-407A-AC59-A8BE0119991A", name: "Опекун", confirmationDocument: false },
            { id: "72DAF54C-3C97-41F0-B0DB-A89200AEED55", name: "Законный представитель", confirmationDocument: true }
        ];
        let specHealths = [
            {
                "id": "27F2471F-3E05-477F-B34D-A5480156C21A",
                "code": 101,
                "name": "Без ограничений",
            },
            {
                "id": "4D61DF89-6A63-4C3D-8CEE-A548002E69EA",
                "code": 102,
                "name": "Общее недоразвитие речи (ОНР)",
            },
            {
                "code": 103,
                "name": "Нарушение зрения",
                "id": "d69f8a0b-7d6f-4796-804a-a88f01009733",

            },
            {
                "code": 104,
                "name": "Нарушения интеллекта",
                "id": "aa9e17ac-2cab-4864-82d6-a88f01009733",

            }
        ];
        let municipalities = [
            { id: "05d9155f-ac54-40be-bca5-a61a00fc60d8", name: "Волоколамский муниципальный район" },
            { id: "add746d8-91d8-42a7-8356-a87b011ca812", name: "Воскресенский муниципальный район" },
            { id: "7a3dffaf-7bb1-488b-8dc1-a61a00fc60dc", name: "Городской округ Балашиха" }
        ]
        let institutionsTypes = [
            { id: "", name: "" },
            { id: 1, name: "Дошкольная образовательная организация" },
            { id: 2, name: "Общеобразовательная организация" },
            { id: 3, name: "Профессиональная образовательная организация" },
            { id: 4, name: "Образовательная организация высшего образования" },
            { id: 5, name: "Организация дополнительного образования" },
            { id: 6, name: "Организация дополнительного профессионального образования" }
        ];
        let currentMunicipality = municipalities[municipalities.length - 1];


        let institutions = [
            { id: "5258E28E-64F1-4F1F-810F-A548002D9A3A", name: "Д/с 027 Лесовичок (Ц., ул Чапаева, 35А)", institutionType: 1 },
            { id: "FC4DBC65-4B5A-4D87-91EA-A548002D9A65", name: "Д/с 028 Ромашка (Ц., ул.Ушакова, 37)", institutionType: 1 },
            { id: "9842E1E2-C64B-474F-A245-A548002D9A75", name: "Д/с 036 Якорек (Ш., ул. Макарова, 6)", institutionType: 1 },
            { id: "0C736803-E27E-4E9E-8209-A452002DB9AA", name: "МКДОУ Детский сад \"Тополёк\"", institutionType: 1 },
            { id: "0C806C63-5331-4B35-8F6F-A452002DB9B4", name: "МКДОУ Детский сад \"Ручеек\"", institutionType: 1 },
            { id: "3819A224-3F46-46C2-9CC0-A452002DB9B4", name: "МКДОУ Детский сад \"Сказка\"", institutionType: 1 },
            { id: "141C4B6A-6DB7-48BF-8407-A452002DB9B8", name: "МКДОУ Детский сад \"Фиалка\"", institutionType: 1 },
            { id: "5403F436-6D3F-4913-8922-A452002DB9BD", name: "МКДОУ Детский сад \"Росинка\"", institutionType: 1 },
            { id: "0159E3B6-B4B2-4018-9F75-A452002DB9C6", name: "МБДОУ №6 детский сад \"Снежинка\"", institutionType: 1 },
            { id: "FF271F42-4095-481B-872C-A54801581328", name: "Структурное подразделение ГБОУ СОШ с. Пестравка", institutionType: 2 },//9
            { id: "DA1F4C68-090C-4ADF-855B-A54801581417", name: "Первомайский филиал ГБОУ СОШ им. Н.С.Доровского с. Подбельск", institutionType: 2 },//10
            { id: "08208319-0207-40CB-B227-A452002DBFED", name: "МАОУ \"СОШ № 33\"", institutionType: 2 },//11
            { id: "B4490801-971B-4465-9722-A452002DBFF2", name: "МАОУ \"Средняя школа № 31\" ПКГО", institutionType: 2 },//12
            { id: "6268F72D-AD1D-495B-AB07-A452002DC00A", name: "МКОУ \"Аянкинская средняя школа\"", institutionType: 2 },
            { id: "7A8B32A4-1710-424B-96CF-A452002DC013", name: "МКОУ \"Слаутнинская средняя школа\"", institutionType: 2 },
        ]
        let groups = [
            { id: "5258E28E-64F1-4F1F-810F-A548002D9A3A", name: "4Б ясельная", vacancies: 11, capacityMax: 12, educYear: 2018, institution: institutions[0] },
            { id: "98DD47A7-9C84-4E5C-AA1F-A548002DBDE6", name: "А старшая", vacancies: 22, capacityMax: 33, educYear: 2018, institution: institutions[0] },
            { id: "46B734F0-EFB5-47D1-B981-A548002DBDE8", name: "В смеш.дошкольная", vacancies: 44, capacityMax: 55, educYear: 2018, institution: institutions[1] },
            { id: "3CE51223-9F25-4BD1-A750-A452002D6021", name: "1а", vacancies: 10, capacityMax: 20, educYear: 2018, institution: institutions[9] },
            { id: "6F48A557-F1CE-48E0-B91A-A452002D6021", name: "1б", vacancies: 20, capacityMax: 30, educYear: 2018, institution: institutions[9] },
            { id: "43D02308-7FFB-4608-B168-A452002D6026", name: "1в", vacancies: 40, capacityMax: 50, educYear: 2018, institution: institutions[9] },
            { id: "4512BD4F-FAB2-4B56-8CBA-A452002D602F", name: "2а", vacancies: 15, capacityMax: 16, educYear: 2018, institution: institutions[10] },
            { id: "AE20AC3F-6D98-441E-9890-A452002D6034", name: "2б", vacancies: 20, capacityMax: 20, educYear: 2018, institution: institutions[10] },
            { id: "7DDD7B39-DEF0-4378-951C-A452002D6038", name: "2в", vacancies: 5, capacityMax: 6, educYear: 2018, institution: institutions[10] },
            { id: "FC4DBC65-4B5A-4D87-91EA-A548002D9A65", name: "4ж", vacancies: 12, capacityMax: 12, educYear: 2019, institution: institutions[11] },
            { id: "0159E3B6-B4B2-4018-9F75-A452002DB9C6", name: "4с", vacancies: 24, capacityMax: 24, educYear: 2019, institution: institutions[11] },
            { id: "DA1F4C68-090C-4ADF-855B-A54801581417", name: "9ж", vacancies: 20, capacityMax: 25, educYear: 2019, institution: institutions[12] },
            { id: "B4490801-971B-4465-9722-A452002DBFF2", name: "9с", vacancies: 25, capacityMax: 30, educYear: 2019, institution: institutions[12] },
            { id: "59FD8537-EF18-4AFD-9FE3-A452002DBFFB", name: "4г", vacancies: 10, capacityMax: 20, educYear: 2018, institution: institutions[13] },
            { id: "B9E74522-408B-404F-AC63-A452002DBFDB", name: "2ж", vacancies: 10, capacityMax: 20, educYear: 2018, institution: institutions[13] }
        ]

        let privilegeOrders = [
            { id: "48c83d8d-a583-410a-8e5a-a5480156ca38", name: "Внеочередное" },
            { id: "6811c7b3-ac13-4227-b02d-a5480156ca38", name: "Первоочередное" }
        ];
        let privileges = [
            { id: "C8315DA6-DEAA-41B3-8371-A548002D945E", name: "Дети граждан, подвергшихся воздействию радиации вследствие катастрофы на Чернобыльской АЭС", privilegeOrder: privilegeOrders[0] },
            { id: "44FB045C-E573-485A-A415-A5480156CA6E", name: "дети прокуроров", privilegeOrder: privilegeOrders[0] },
            { id: "3AA3DA14-F4A7-4F72-A9EC-A5480156CA76", name: "дети судей", privilegeOrder: privilegeOrders[0] },
            { id: "5DC2751E-9210-4A73-8647-A548002D9471", name: "Дети многодетных семей", privilegeOrder: privilegeOrders[1] },
            { id: "6FC5026E-A113-4BB8-B4D3-A548002D9489", name: "Дети граждан Российской Федерации (сотрудники и военнослужащие}, уволенных с федеральной противопожарной службы, вследствие увечья или иного повреждения здоровья, полученных в связи с выполнением служебных обязанностей и исключивших возможность дальнейшего прохождения указанной службы", privilegeOrder: privilegeOrders[1] },
            { id: "00D70DBA-7199-4664-A12B-A5480156CA97", name: "дети-инвалиды", privilegeOrder: privilegeOrders[1] },
        ];
        let specificities = [
            { id: "FD80C74C-581E-450F-9374-A893011A7623", name: "специфичность группы №1" },
            { id: "EE8DCE4E-4E9E-4D69-8723-A893011A762C", name: "специфичность группы №2" },
            { id: "44C8880D-837E-47A1-BB6B-A893011A7631", name: "специфичность группы №3" }
        ];
        let settings = [ { currentYear: new Date().getFullYear(), maxCountWishPreschools: 3, maxCountWishSchools: 4 } ];

        let specializations = [
            { id: "C3EEDF8F-FD26-4C5A-995E-A452002D607F", name: "Общеобразовательный" },
            { id: "ADCB5A00-E848-48E8-89BB-A452002D6083", name: "Профильный углубленный" },
            { id: "E7759C0A-8A92-4592-A63B-A59900FDAC92", name: "Профильное обучение" },
        ];


        const educPrograms = [
            {
                id: "3147CCD7-5326-4273-8C86-A452002D6042",
                name: "Федеральная государственная программа начального общего, основного общего и среднего(полного)общего образования.",
                shortName: "Фед гос прог нач общего, основного общего и среднего(полного)общего образования.",
                educProgramType: EducProgramType.School
            },
            { id: "532C80B6-A140-4156-8287-A452002D6046", name: "Основного общего образования", shortName: "Основн общ обр", educProgramType: EducProgramType.School },
            { id: "09618270-297C-425D-84DE-A452002D604B", name: "Среднего общего образования", shortName: "Сред общ обр", educProgramType: EducProgramType.School },
            { id: "C31ECBFA-3357-4430-930F-A452002D6050", name: "Начального общего образования ", shortName: "Нач общ обр", educProgramType: EducProgramType.School },
            {
                id: "C92EB29B-C348-415D-A46C-A452002D6059",
                name: "Подготовка к школе детей с задержкой психического развития. Под редакцией С.Г. Шевченко",
                shortName: "псих. Шевченко",
                educProgramType: EducProgramType.Preschool
            },
            {
                id: "653E48EA-2C61-4F29-B4AD-A452002D605E",
                name: "Программы «Воспитание и обучение глухих детей дошкольного возраста», авторы Л.П. Носкова, Л.А. Головчиц, М., 1991 г.",
                shortName: "Носкова воспитание",
                educProgramType: EducProgramType.Preschool
            }
        ];
        let countryStateDocuments = [

        ];
        let familiesInfos = [
            { id: "516C3D30-8FF2-4163-BBA8-A452002EC33A", name: "Особое семейное положение" },
            { id: "516C3D30-8FF2-4163-BBA8-A452002EC33A", name: "Многодетная семья" },
            { id: "516C3D30-8FF2-4163-BBA8-A452002EC33A", name: "Малоимущие" }
        ]
        let disabilities = [
            { id: "1", name: "1 группа" },
            { id: "2", name: "2 группа" },
            { id: "3", name: "3 группа" }
        ]
        let confirmationDocuments = [];
        let conctactInfos = [];
        let schoolClasses = [];
        let schoolInquiryInfos = [];
        let inquiryInfos = [];
        let fileAttachments = [];
        let petitions = [];
        let currentEducationPlaces = [];
        return {
            fileAttachments: fileAttachments,
            inquiryInfos: inquiryInfos,
            schoolInquiryInfos: schoolInquiryInfos,
            conctactInfos: conctactInfos,
            confirmationDocuments: confirmationDocuments,
            disabilities: disabilities,
            familiesInfos: familiesInfos,
            countryStateDocuments: countryStateDocuments,
            inquiries: inquiries,
            countries: Countries,
            relationTypes: relationTypes,
            specHealths: specHealths,
            municipalities: municipalities,
            institutionsTypes: institutionsTypes,
            currentMunicipality: currentMunicipality,
            institutions: institutions,
            schoolClasses: schoolClasses,
            privilegeOrders: privilegeOrders,
            privileges: privileges,
            specificities: specificities,
            settings: settings,
            statuses: statuses,
            specializations: specializations,
            educPrograms: educPrograms,
            groups: groups,
            petitions: petitions,
            currentEducationPlaces: currentEducationPlaces
        }
    };
})();