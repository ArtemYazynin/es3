import { Injectable, Inject } from '@angular/core';
import { Location } from "./models/location.model"
import { DataSourceService } from './data-source.service';
import { Http } from '@angular/http';
import { SERVER_URL } from '../app.module';

@Injectable()
export class LocationDataSourceService extends DataSourceService<Location>{

  protected api = `${this.serverUrl}/locations`;

  constructor(http: Http, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
