import { Inject, Injectable } from '@angular/core';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpClient } from '@angular/common/http';
import { SchoolClass } from './models/school-class.model';

@Injectable()
export class SchoolClassDataSourceService extends DataSourceService<SchoolClass>{
  public api = `${this.serverUrl}/schoolClasses`;
  constructor(http: HttpClient, @Inject(SERVER_URL) private serverUrl) {
    super(http)
  }
}
