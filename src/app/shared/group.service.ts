import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Group } from './models/group';
import { HttpInterceptor } from './http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpInterceptor) { }

  getGroup(institutionId: string, id?: string): Observable<Array<Group>> {
    let url = isNullOrUndefined(id) || id == ""
      ? this.getBaseUrl(institutionId)
      : this.getBaseUrl(institutionId) + "&id=" + id
    return this.http.get(url).pipe(map(result => {
      return <Array<Group>>result.json();
    }));
  }
  private getBaseUrl(institutionId: string) {
    return "app/groups?institutionId=" + institutionId
  }
}
