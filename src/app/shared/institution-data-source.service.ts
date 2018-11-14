import { Injectable, Inject } from '@angular/core';
import { Institution } from './models/institution.model';
import { Http } from '@angular/http';
import { empty, Observable } from 'rxjs';
import { DataSourceService } from './data-source.service';
import { SERVER_URL } from '../app.module';
import { HttpInterceptor } from './http-interceptor';

@Injectable()
export class InstitutionDataSourceService extends DataSourceService<Institution>{
  public api = `${this.serverUrl}/institutions`;
  constructor(http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http)
  }
}
