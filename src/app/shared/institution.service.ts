import { Injectable } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Entity } from '.';
import { Institution } from './institution';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http: HttpInterceptor) { }
  private baseUrl = {
    institutionTypes: "app/institutionsTypes"
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
    let url = type ? "app/institutions?institutionType=" + type : "app/institutions";
    return this.http.get(url).pipe(map(result => {
      return <Array<Institution>>result.json();
    }));
  }


}
