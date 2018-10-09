import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { isNullOrUndefined } from 'util';
import { HttpInterceptor } from './http-interceptor';
import { Country } from './models/country.model';

@Injectable()
export class CitizenshipService {

  constructor(private http: HttpInterceptor) { }

  getCountries(): Observable<Array<Country>> {
    const key = "countries";
    const data = localStorage.getItem(key);
    if (isNullOrUndefined(data)) {
      return this.http.get("app/" + key).pipe(map(result => {
        let countries = <Array<Country>>result.json();
        localStorage.setItem(key, JSON.stringify(countries));
        return countries;
      }));
    }
    return of(JSON.parse(data));
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
