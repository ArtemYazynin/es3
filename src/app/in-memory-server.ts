import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RelationType, Countries, IdentityCardType, SpecHealth, Area, Entity } from './shared/index';
import { EnumToArrayPipe } from './shared/enum-to-array-pipe';

export class InMemoryService implements InMemoryDbService {
  createDb() {
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
      { id: "5258E28E-64F1-4F1F-810F-A548002D9A3A", name: "Д/с 027 Лесовичок (Ц., ул Чапаева, 35А)", institutionType: 1 },
      { id: "FC4DBC65-4B5A-4D87-91EA-A548002D9A65", name: "Д/с 028 Ромашка (Ц., ул.Ушакова, 37)", institutionType: 1 },
      { id: "9842E1E2-C64B-474F-A245-A548002D9A75", name: "Д/с 036 Якорек (Ш., ул. Макарова, 6)", institutionType: 1 },
      { id: "FF271F42-4095-481B-872C-A54801581328", name: "Структурное подразделение ГБОУ СОШ с. Пестравка", institutionType: 2, },
      { id: "DA1F4C68-090C-4ADF-855B-A54801581417", name: "Первомайский филиал ГБОУ СОШ им. Н.С.Доровского с. Подбельск", institutionType: 2 },
      { id: "55BC4673-3909-40F6-9410-A548015814A1", name: "Мочалеевский филиал ГБОУ СОШ с. Подбельск", institutionType: 2 },
    ]
    return {
      heroes: heroes,
      countries: Countries,
      relationTypes: relationTypes,
      identityCardTypes: identityCardTypes,
      specHealths: specHealths,
      municipalities: municipalities,
      institutionsTypes: institutionsTypes,
      currentMunicipality: currentMunicipality,
      institutions: institutions
    };
  }
}