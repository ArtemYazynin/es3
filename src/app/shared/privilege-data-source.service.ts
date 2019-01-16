import { Inject, Injectable } from '@angular/core';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpClient } from '@angular/common/http';
import { Privilege } from './models/privilege.model';

@Injectable()
export class PrivilegeDataSourceService extends DataSourceService<Privilege>{

  protected api = `${this.serverUrl}/privileges`;

  constructor(http: HttpClient, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }  
}
