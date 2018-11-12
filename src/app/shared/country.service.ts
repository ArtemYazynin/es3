import { Injectable } from '@angular/core';
import { CountryDataSourceService } from './country-data-source.service';

@Injectable()
export class CountryService {

  constructor(private dataSource:CountryDataSourceService) { }

  gets(){
    return this.dataSource.gets();
  }
}
