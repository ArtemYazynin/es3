import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Group } from './group';
import { map } from 'rxjs/operators';
import { HttpInterceptor } from './http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpInterceptor) { }

  getGroup(institutionId: string): Observable<Array<Group>> {
    return this.http.get("app/groups?institutionId=" + institutionId).pipe(map(result => {
      return <Array<Group>>result.json();
    }));
  }
}
