import { Injectable } from '@angular/core';
import { Country } from './country';
import { HttpInterceptor } from '../http-interceptor';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { CitizenshipSelectComponent } from '../../person/citizenship-select/citizenship-select.component';

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

  hasForeignCitizenship(citizenshipSelectComponent: CitizenshipSelectComponent, countries: Array<Country>) {
    if (!citizenshipSelectComponent || !countries || countries.length == 0) return false;
    let codeOfRussia = countries.find(x => x.name === "Россия").id;
    let foreignCitizenshipsExists = (() => {
      let result = citizenshipSelectComponent.citizenships.findIndex(x => {
        return x != codeOfRussia;
      });
      return result == -1 ? false : true;;
    })();
    return foreignCitizenshipsExists;
  }
}
