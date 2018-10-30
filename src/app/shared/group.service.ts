import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Group } from './models/group.model';
import { HttpInterceptor } from './http-interceptor';
import { SERVER_URL } from '../app.module';

@Injectable()
export class GroupService {

  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  getGroups(institutionId: string): Observable<Array<Group>> {
    return this.http.get(`${this.serverUrl}/groups`).pipe(map(result => {
      let institutions = <Array<Group>>result.json();
      return institutions.filter(x => x.institution && x.institution.id == institutionId);
    }));
  }
}
