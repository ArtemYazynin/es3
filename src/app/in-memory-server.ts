import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';
import { Area, CompilationOfWizardSteps, Countries, Entity, IdentityCardType, Institution, Privilege, PrivilegeOrder, RelationType, Settings, Specificity } from './shared';
import { EnumToArrayPipe } from './shared/enum-to-array-pipe';

export class InMemoryService implements InMemoryDbService {
  createDb() {
    let inquiries:Array<CompilationOfWizardSteps> = [];
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
      new Institution("FF271F42-4095-481B-872C-A54801581328", "Структурное подразделение ГБОУ СОШ с. Пестравка", 2),
      new Institution("DA1F4C68-090C-4ADF-855B-A54801581417", "Первомайский филиал ГБОУ СОШ им. Н.С.Доровского с. Подбельск", 2),
      new Institution("55BC4673-3909-40F6-9410-A548015814A1", "Мочалеевский филиал ГБОУ СОШ с. Подбельск", 2)
    ];
    let groups = [
      { id: "5258E28E-64F1-4F1F-810F-A548002D9A3A", name: "4Б ясельная", groupType: 1, institutionId: institutions[0].id },
      { id: "98DD47A7-9C84-4E5C-AA1F-A548002DBDE6", name: "А старшая", groupType: 1, institutionId: institutions[0].id },
      { id: "46B734F0-EFB5-47D1-B981-A548002DBDE8", name: "В смеш.дошкольная", groupType: 1, institutionId: institutions[1].id },

      { id: "C592FB7F-B853-4781-99C5-A59800C352FF", name: "1 _коррекционный", groupType: 2, institutionId: institutions[3].id },
      { id: "A537C916-C95A-4DE8-A257-A59800C3D4FA", name: "_только для воспитанников СП школы №75", groupType: 2, institutionId: institutions[3].id },
      { id: "314BB1DF-0FCC-433D-ABB7-A59800C594DA", name: "_только для воспитанников СП школы №86", groupType: 2, institutionId: institutions[5].id },
    ];
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
    let settings = new Settings(new Date().getFullYear(), 3);


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
      groups: groups,
      privilegeOrders: privilegeOrders,
      privileges: privileges,
      specificities: specificities,
      settings: settings,
      inquiries:inquiries
    };
  }
}