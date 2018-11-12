import { Injectable, Inject } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { Country } from '.';
import { Http, RequestMethod } from '@angular/http';
import { SERVER_URL } from '../app.module';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable()
export class CountryDataSourceService extends DataSourceService<Country>{
  private apiKey = "countries";
  protected api = `${this.serverUrl}/${this.apiKey}`;

  constructor(http: Http, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }

  gets() {
    const data = localStorage.getItem(this.apiKey);
    if (isNullOrUndefined(data)) {
      return this.sendRequest(RequestMethod.Get, this.api).pipe(map(result => {
        let countries = <Array<Country>>result.json();
        localStorage.setItem(this.apiKey, JSON.stringify(countries));
        return countries;
      }));
    }
    return of(JSON.parse(data));
  }
}
