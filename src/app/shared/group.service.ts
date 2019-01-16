import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Group } from './models/group.model';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../app.module';

@Injectable()
export class GroupService {

  constructor(private http:HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  getGroups(institutionId: string): Observable<Array<Group>> {
    return this.http.get(`${this.serverUrl}/groups`).pipe(map(result => {
      let institutions = <Array<Group>>result;
      return institutions.filter(x => x.institution && x.institution.id == institutionId);
    }));
  }
}
