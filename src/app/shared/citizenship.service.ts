import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { isNullOrUndefined } from 'util';
import { HttpClient } from '@angular/common/http';
import { Country } from './models/country.model';
import { SERVER_URL } from '../app.module';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class CitizenshipService {

  constructor() { }

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
