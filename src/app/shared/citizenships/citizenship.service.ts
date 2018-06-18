import { Injectable } from '@angular/core';
import { Country } from './country';
import { HttpInterceptor } from '../http-interceptor';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CitizenshipService {

  constructor(private http: HttpInterceptor) { }

  getCountries(): Observable<Array<Country>> {
    return this.http.get("app/countries").pipe(map(result => {
      return <Array<Country>>result.json();
    }));
  }
}
