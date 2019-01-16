import { Inject, Injectable } from '@angular/core';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpClient } from '@angular/common/http';
import { Institution } from './models/institution.model';

@Injectable()
export class InstitutionDataSourceService extends DataSourceService<Institution>{
  public api = `${this.serverUrl}/institutions`;
  constructor(http: HttpClient, @Inject(SERVER_URL) private serverUrl) {
    super(http)
  }
}
