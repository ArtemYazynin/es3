import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CitizenshipDataSourceService } from './citizenship-data-source.service';
import { Citizenship } from './models/citizenship.model';
import { Country } from './models/country.model';

@Injectable()
export class CitizenshipService {

  constructor(private dataSource: CitizenshipDataSourceService) { }

  create(citizenship: Citizenship): Observable<Citizenship> {
    return this.dataSource.post(citizenship);
  }

  gets() {
    return this.dataSource.gets();
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
