import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RelationType, Countries, IdentityCardType, IdentityCard } from './shared/index';
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
    let relationTypes =  [
        new RelationType("26B732C2-580D-4FCC-8034-A88F01009735","Отец",false),
        new RelationType("4575BF75-EF7C-4A82-B8F5-A88F01009735","Мать",false),
        new RelationType("2DD2F703-28C6-407A-AC59-A8BE0119991A","Опекун",false),
        new RelationType("72DAF54C-3C97-41F0-B0DB-A89200AEED55","Законный представитель", true)
    ]
    return {
        heroes:heroes,
        countries: Countries,
        relationTypes: relationTypes,
        identityCardTypes:identityCardTypes
    };
  }
}