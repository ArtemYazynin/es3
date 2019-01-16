import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CurrentEducationPlace } from '.';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';

@Injectable()
export class CurrentEducationPlaceDataSourceService extends DataSourceService<CurrentEducationPlace>{

  protected api = `${this.serverUrl}/currentEducationPlaces`;

  constructor(protected http: HttpClient, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
