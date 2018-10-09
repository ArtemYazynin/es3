import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { HttpInterceptor } from './http-interceptor';
import { Institution } from './models/institution.model';
import { Group } from './models/group.model';
import { Entity } from './models/entity.model';

@Injectable()
export class InstitutionService {

  constructor(private http: HttpInterceptor) { }
  private baseUrl = {
    institutionTypes: "app/institutionsTypes",
    institutions: "app/institutions"
  }
  getTypes(id?: number): Observable<Array<Entity<number>>> {
    const url = isNullOrUndefined(id)
      ? this.baseUrl.institutionTypes
      : this.baseUrl.institutionTypes + "?id=" + id
    return this.http.get(url).pipe(map(result => {
      return <Array<Entity<number>>>result.json();
    }));
  }
  getInstitutions(type?: number): Observable<Array<Institution>> {
    let url = type ? `${this.baseUrl.institutions}?institutionType=${type}` : "app/institutions";
    return this.http.get(url).pipe(map(result => {
      return <Array<Institution>>result.json();
    }));
  }

  getById(id: string): Observable<Array<Institution>> {
    if (!id) return Observable.create();
    let url = `${this.baseUrl.institutions}?id=${id}`;
    return this.http.get(url).pipe(map(result => {
      return <Array<Institution>>result.json();
    }));
  }
}
