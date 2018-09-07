import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpInterceptor } from '../http-interceptor';
import { Country } from './country';

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

  hasForeignCitizenship(citizenships: Array<number>, countries: Array<Country>) {
    if (!citizenships || !countries || countries.length == 0) return false;
    let codeOfRussia = countries.find(x => x.name === "Россия").id;
    let foreignCitizenshipsExists = (() => {
      let result = citizenships.findIndex(x => {
        return x != codeOfRussia;
      });
      return result == -1 ? false : true;;
    })();
    return foreignCitizenshipsExists;
  }

  hasRfCitizenship(citizenships: Array<number>, countries: Array<Country>) {
    if (!citizenships || !countries || countries.length == 0) return false;
    let codeOfRussia = countries.find(x => x.name === "Россия").id;
    let rfCitizenshipsExists = (() => {
      let result = citizenships.findIndex(x => {
        return x == codeOfRussia;
      });
      return result == -1 ? false : true;;
    })();
    return rfCitizenshipsExists;
  }
}
