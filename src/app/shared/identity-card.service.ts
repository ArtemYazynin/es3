import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpInterceptor } from './http-interceptor';
import { Entity } from './models/entity.model';
import { IdentityCardType } from './models/identityCardType';
import { EnumToArrayPipe } from './enum-to-array-pipe';
import { IdentityCardDataSourceService } from './identity-card-data-source.service';
import { IdentityCard } from './models/identityCard.model';

@Injectable()
export class IdentityCardService {

  constructor(private dataSource:IdentityCardDataSourceService) { }

  getTypes(groupOfId?: Array<number>): Observable<Array<Entity<number>>> {
    let allTypes = new EnumToArrayPipe().transform(IdentityCardType.values(), IdentityCardType);
    if (!groupOfId || groupOfId.length === 0) return of(allTypes);

    let filteredResult = allTypes.filter(val => {
      let id = groupOfId.find(el => el == val.id);
      return val.id == id;
    })
    return of(filteredResult);
  }

  create(identityCard:IdentityCard){
    return this.dataSource.post(identityCard);
  }
}
