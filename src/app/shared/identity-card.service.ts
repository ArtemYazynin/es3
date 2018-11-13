import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpInterceptor } from './http-interceptor';
import { Entity } from './models/entity.model';
import { IdentityCardType } from './models/identityCardType';
import { EnumToArrayPipe } from './enum-to-array-pipe';

@Injectable()
export class IdentityCardService {

  constructor(private http: HttpInterceptor) { }

  getTypes(groupOfId?: Array<number>): Observable<Array<Entity<number>>> {
    let allTypes = new EnumToArrayPipe().transform(IdentityCardType.values(), IdentityCardType);
    if (!groupOfId || groupOfId.length === 0) return of(allTypes);

    let filteredResult = allTypes.filter(val => {
      let id = groupOfId.find(el => el == val.id);
      return val.id == id;
    })
    return of(filteredResult);
  }
}
