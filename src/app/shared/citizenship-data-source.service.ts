import { Injectable, Inject } from '@angular/core';
import { Citizenship } from './models/citizenship.model';
import { DataSourceService } from './data-source.service';
import { Http } from '@angular/http';
import { SERVER_URL } from '../app.module';

@Injectable()
export class CitizenshipDataSourceService extends DataSourceService<Citizenship>{

  protected api = `${this.serverUrl}/citizenships`;

  constructor(http: Http, @Inject(SERVER_URL) private serverUrl) {
    super(http)
  }
}
