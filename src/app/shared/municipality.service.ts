import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { Municipality } from './models/area.model';
import { Es3HttpClient } from './es3-http-client';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {
  private dataSource: DataSourceService<Municipality>;
  constructor(http: Es3HttpClient, injector: Injector) {
    this.dataSource = new DataSourceService<Municipality>(http, injector, "municipalities");
  }

  gets() {
    return this.dataSource.gets();
  }

  get(id: string) {
    return this.dataSource.get(id);
  }

  
}
