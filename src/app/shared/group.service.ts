import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Group } from './models/group.model';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../app.module';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class GroupService {

  constructor(private http:Es3HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  getGroups(institutionId: string): Observable<Array<Group>> {
    return this.http.Get(`${this.serverUrl}/groups`).pipe(map(result => {
      let institutions = <Array<Group>>result;
      return institutions.filter(x => x.institution && x.institution.id == institutionId);
    }));
  }
}
