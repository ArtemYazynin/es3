import { Inject, Injectable } from '@angular/core';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpInterceptor } from './http-interceptor';
import { Institution } from './models/institution.model';

@Injectable()
export class InstitutionDataSourceService extends DataSourceService<Institution>{
  public api = `${this.serverUrl}/institutions`;
  constructor(http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http)
  }
}
