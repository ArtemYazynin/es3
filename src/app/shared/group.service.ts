import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Group } from './models/group';
import { HttpInterceptor } from './http-interceptor';

@Injectable()
export class GroupService {

  constructor(private http: HttpInterceptor) { }

  getGroups(institutionId: string): Observable<Array<Group>> {
    let url = `app/groups`
    return this.http.get(url).pipe(map(result => {
      let institutions = <Array<Group>>result.json();
      return institutions.filter(x => x.institution && x.institution.id == institutionId);
    }));
  }
}
