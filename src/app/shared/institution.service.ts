import { Injectable } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Entity } from '.';
import { Institution } from './institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http: HttpInterceptor) { }

  getTypes(): Observable<Array<Entity<number>>> {
    return this.http.get("app/institutionsTypes").pipe(map(result => {
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
