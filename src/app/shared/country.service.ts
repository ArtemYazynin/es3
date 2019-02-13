import { Injectable, Injector } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { Es3HttpClient } from './es3-http-client';
import { Country } from './models/country.model';
import { isNullOrUndefined } from 'util';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiKey = "countries";
  private dataSource: DataSourceService<Country>;
  constructor(http: Es3HttpClient, injector: Injector) {
    this.dataSource = new DataSourceService<Country>(http, injector, this.apiKey);
  }

  gets() {
    return this.dataSource.gets();
  }
}
