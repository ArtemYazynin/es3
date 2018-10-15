import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { HttpInterceptor } from './http-interceptor';
import { Institution } from './models/institution.model';
import { Group } from './models/group.model';
import { Entity } from './models/entity.model';
import { SERVER_URL } from '../app.module';

@Injectable()
export class InstitutionService {

  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  private api = {
    institutionsTypes: `${this.serverUrl}/institutionsTypes`,
    institutions: `${this.serverUrl}/institutions`
  }
  getTypes(id?: number): Observable<Array<Entity<number>>> {
    const url = isNullOrUndefined(id)
      ? this.api.institutionsTypes
      : this.api.institutionsTypes + "/" + id
    return this.http.get(url).pipe(map(result => {
      return <Array<Entity<number>>>result.json();
    }));
  }
  getInstitutions(type?: number): Observable<Array<Institution>> {
    let url = type ? `${this.api.institutions}?institutionType=${type}` : this.api.institutions;
    return this.http.get(url).pipe(map(result => {
      return <Array<Institution>>result.json();
    }));
  }

  getById(id: string): Observable<Array<Institution>> {
    if (!id) return Observable.create();
    let url = `${this.api.institutions}/${id}`;
    return this.http.get(url).pipe(map(result => {
      return <Array<Institution>>result.json();
    }));
  }
}
