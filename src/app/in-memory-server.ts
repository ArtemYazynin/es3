import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Inquiry } from './shared/models/inquiry';
import { Area, Countries, Institution, Privilege, PrivilegeOrder, Settings, Specificity, IdentityCardType, RelationType, Entity, Status, Specialization, EducProgram, EducProgramType, Group } from './shared/index';
import { EnumToArrayPipe } from './shared/enum-to-array-pipe';
import { Guid } from './shared/models/guid';

export class InMemoryService implements InMemoryDbService {
  createDb() {
    let inquiries: Array<Inquiry> = [];
    let statuses: Array<Status> = [
      new Status("935F8E2C-69F5-46EF-975F-A452002D5F40", "Новое"),
      new Status("81E1C045-4357-4031-9856-A452002D5FFB", "Очередник"),
      new Status("7D87390B-BCCE-456E-BF12-A452002D6005", "Отмена"),
    ]
    let heroes = [
      { id: 1, name: 'Windstorm' },
      { id: 2, name: 'Bombasto' },
      { id: 3, name: 'Magneta' },
      { id: 4, name: 'Tornado' }
    ];
    let identityCardTypes = new EnumToArrayPipe().transform(IdentityCardType.values(), IdentityCardType);
    let relationTypes = [
      new RelationType("26B732C2-580D-4FCC-8034-A88F01009735", "Отец", false),
      new RelationType("4575BF75-EF7C-4A82-B8F5-A88F01009735", "Мать", false),
      new RelationType("2DD2F703-28C6-407A-AC59-A8BE0119991A", "Опекун", false),
      new RelationType("72DAF54C-3C97-41F0-B0DB-A89200AEED55", "Законный представитель", true)
    ];
    let specHealths = [
      {
        "code": 101,
        "name": "Без ограничений",
      },
      {
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
    let municipalities: Array<Area> = [
      new Area("05d9155f-ac54-40be-bca5-a61a00fc60d8", "Волоколамский муниципальный район"),
      new Area("add746d8-91d8-42a7-8356-a87b011ca812", "Воскресенский муниципальный район"),
      new Area("7a3dffaf-7bb1-488b-8dc1-a61a00fc60dc", "Городской округ Балашиха")
    ]
    let institutionsTypes: Array<Entity<number>> = [
      new Entity<number>(1, "Дошкольная образовательная организация"),
      new Entity<number>(2, "Общеобразовательная организация"),
      new Entity<number>(3, "Профессиональная образовательная организация"),
      new Entity<number>(4, "Образовательная организация высшего образования"),
      new Entity<number>(5, "Организация дополнительного образования"),
      new Entity<number>(6, "Организация дополнительного профессионального образования")
    ];
    let currentMunicipality = municipalities[municipalities.length - 1];


    let institutions = [
      new Institution("5258E28E-64F1-4F1F-810F-A548002D9A3A", "Д/с 027 Лесовичок (Ц., ул Чапаева, 35А)", 1),
      new Institution("FC4DBC65-4B5A-4D87-91EA-A548002D9A65", "Д/с 028 Ромашка (Ц., ул.Ушакова, 37)", 1),
      new Institution("9842E1E2-C64B-474F-A245-A548002D9A75", "Д/с 036 Якорек (Ш., ул. Макарова, 6)", 1),
      new Institution("0C736803-E27E-4E9E-8209-A452002DB9AA", "МКДОУ Детский сад \"Тополёк\"", 1),
      new Institution("0C806C63-5331-4B35-8F6F-A452002DB9B4", "МКДОУ Детский сад \"Ручеек\"", 1),
      new Institution("3819A224-3F46-46C2-9CC0-A452002DB9B4", "МКДОУ Детский сад \"Сказка\"", 1),
      new Institution("141C4B6A-6DB7-48BF-8407-A452002DB9B8", "МКДОУ Детский сад \"Фиалка\"", 1),
      new Institution("5403F436-6D3F-4913-8922-A452002DB9BD", "МКДОУ Детский сад \"Росинка\"", 1),
      new Institution("0159E3B6-B4B2-4018-9F75-A452002DB9C6", "МБДОУ №6 детский сад \"Снежинка\"", 1),
      new Institution("FF271F42-4095-481B-872C-A54801581328", "Структурное подразделение ГБОУ СОШ с. Пестравка", 2),//9
      new Institution("DA1F4C68-090C-4ADF-855B-A54801581417", "Первомайский филиал ГБОУ СОШ им. Н.С.Доровского с. Подбельск", 2),//10
      new Institution("08208319-0207-40CB-B227-A452002DBFED", "МАОУ \"СОШ № 33\"", 2),//11
      new Institution("B4490801-971B-4465-9722-A452002DBFF2", "МАОУ \"Средняя школа № 31\" ПКГО", 2),//12
      new Institution("6268F72D-AD1D-495B-AB07-A452002DC00A", "МКОУ \"Аянкинская средняя школа\"", 2),
      new Institution("7A8B32A4-1710-424B-96CF-A452002DC013", "МКОУ \"Слаутнинская средняя школа\"", 2),
    ]
    let groups = [
      new Group("5258E28E-64F1-4F1F-810F-A548002D9A3A", "4Б ясельная", 11, 12, 2018, institutions[0]),
      new Group("98DD47A7-9C84-4E5C-AA1F-A548002DBDE6", "А старшая", 22, 33, 2018, institutions[0]),
      new Group("46B734F0-EFB5-47D1-B981-A548002DBDE8", "В смеш.дошкольная", 44, 55, 2018, institutions[1]),
      new Group("3CE51223-9F25-4BD1-A750-A452002D6021", "1а", 10, 20, 2018, institutions[9]),
      new Group("6F48A557-F1CE-48E0-B91A-A452002D6021", "1б", 20, 30, 2018, institutions[9]),
      new Group("43D02308-7FFB-4608-B168-A452002D6026", "1в", 40, 50, 2018, institutions[9]),
      new Group("4512BD4F-FAB2-4B56-8CBA-A452002D602F", "2а", 15, 16, 2018, institutions[10]),
      new Group("AE20AC3F-6D98-441E-9890-A452002D6034", "2б", 20, 20, 2018, institutions[10]),
      new Group("7DDD7B39-DEF0-4378-951C-A452002D6038", "2в", 5, 6, 2018, institutions[10]),

      new Group("FC4DBC65-4B5A-4D87-91EA-A548002D9A65", "4ж", 12, 12, 2019, institutions[11]),
      new Group("0159E3B6-B4B2-4018-9F75-A452002DB9C6", "4с", 24, 24, 2019, institutions[11]),

      new Group("DA1F4C68-090C-4ADF-855B-A54801581417", "9ж", 20, 25, 2019, institutions[12]),
      new Group("B4490801-971B-4465-9722-A452002DBFF2", "9с", 25, 30, 2019, institutions[12]),

      new Group("59FD8537-EF18-4AFD-9FE3-A452002DBFFB", "4г", 10, 20, 2018, institutions[13]),
      new Group("B9E74522-408B-404F-AC63-A452002DBFDB", "2ж", 10, 20, 2018, institutions[13])
    ]

    let privilegeOrders = [
      new PrivilegeOrder("48c83d8d-a583-410a-8e5a-a5480156ca38", "Внеочередное"),
      new PrivilegeOrder("6811c7b3-ac13-4227-b02d-a5480156ca38", "Первоочередное")
    ];
    let privileges = [
      new Privilege("C8315DA6-DEAA-41B3-8371-A548002D945E", "Дети граждан, подвергшихся воздействию радиации вследствие катастрофы на Чернобыльской АЭС", privilegeOrders[0]),
      new Privilege("44FB045C-E573-485A-A415-A5480156CA6E", "дети прокуроров", privilegeOrders[0]),
      new Privilege("3AA3DA14-F4A7-4F72-A9EC-A5480156CA76", "дети судей", privilegeOrders[0]),
      new Privilege("5DC2751E-9210-4A73-8647-A548002D9471", "Дети многодетных семей", privilegeOrders[1]),
      new Privilege("6FC5026E-A113-4BB8-B4D3-A548002D9489", "Дети граждан Российской Федерации (сотрудники и военнослужащие), уволенных с федеральной противопожарной службы, вследствие увечья или иного повреждения здоровья, полученных в связи с выполнением служебных обязанностей и исключивших возможность дальнейшего прохождения указанной службы", privilegeOrders[1]),
      new Privilege("00D70DBA-7199-4664-A12B-A5480156CA97", "дети-инвалиды", privilegeOrders[1]),
    ];
    let specificities = [
      new Specificity("FD80C74C-581E-450F-9374-A893011A7623", "специфичность группы №1"),
      new Specificity("EE8DCE4E-4E9E-4D69-8723-A893011A762C", "специфичность группы №2"),
      new Specificity("44C8880D-837E-47A1-BB6B-A893011A7631", "специфичность группы №3")
    ];
    let settings = new Settings(new Date().getFullYear(), 3, 4);

    let specializations = [
      new Specialization("C3EEDF8F-FD26-4C5A-995E-A452002D607F", "Общеобразовательный"),
      new Specialization("ADCB5A00-E848-48E8-89BB-A452002D6083", "Профильный углубленный"),
      new Specialization("E7759C0A-8A92-4592-A63B-A59900FDAC92", "Профильное обучение"),
    ];

    const educPrograms = [
      new EducProgram("3147CCD7-5326-4273-8C86-A452002D6042", "Федеральная государственная программа начального общего, основного общего и среднего(полного)общего образования.",
        "Фед гос прог нач общего, основного общего и среднего(полного)общего образования.", EducProgramType.School),
      new EducProgram("532C80B6-A140-4156-8287-A452002D6046", "Основного общего образования", "Основн общ обр", EducProgramType.School),
      new EducProgram("09618270-297C-425D-84DE-A452002D604B", "Среднего общего образования", "Сред общ обр", EducProgramType.School),
      new EducProgram("C31ECBFA-3357-4430-930F-A452002D6050", "Начального общего образования ", "Нач общ обр", EducProgramType.School),
      new EducProgram("102B98BD-C593-480C-8537-A452002D6055", "Присмотр и уход", "присм. и ух.", EducProgramType.Preschool),
      new EducProgram("C92EB29B-C348-415D-A46C-A452002D6059", "Подготовка к школе детей с задержкой психического развития. Под редакцией С.Г. Шевченко"
        , "псих. Шевченко", EducProgramType.Preschool),
      new EducProgram("653E48EA-2C61-4F29-B4AD-A452002D605E", "Программы «Воспитание и обучение глухих детей дошкольного возраста», авторы Л.П. Носкова, Л.А. Головчиц, М., 1991 г.",
        "Носкова воспитание", EducProgramType.Preschool)
    ];
    return {
      heroes: heroes,
      countries: Countries,
      relationTypes: relationTypes,
      identityCardTypes: identityCardTypes,
      specHealths: specHealths,
      municipalities: municipalities,
      institutionsTypes: institutionsTypes,
      currentMunicipality: currentMunicipality,
      institutions: institutions,
      privilegeOrders: privilegeOrders,
      privileges: privileges,
      specificities: specificities,
      settings: settings,
      inquiries: inquiries,
      statuses: statuses,
      specializations: specializations,
      educPrograms: educPrograms,
      groups: groups
    };
  }
}