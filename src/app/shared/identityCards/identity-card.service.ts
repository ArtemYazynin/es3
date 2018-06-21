import { Injectable } from '@angular/core';
import { Entity } from '../entity';
import { HttpInterceptor } from '../http-interceptor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdentityCardService {

  constructor(private http: HttpInterceptor) { }

  getTypes(groupOfId?: Array<number>): Observable<Array<Entity<number>>> {
    return this.http.get("app/identityCardTypes").pipe(map(result => {
      let allTypes = <Array<Entity<number>>>result.json();
      if (!groupOfId || groupOfId.length === 0) return allTypes;

      let filteredResult = allTypes.filter(val=>{
        let id = groupOfId.find(el=>el == val.id);
        return val.id == id;
      })
      return filteredResult;
    }));
  }
}
