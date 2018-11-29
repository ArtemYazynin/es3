import { Inject, Injectable } from '@angular/core';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpInterceptor } from './http-interceptor';
import { Privilege } from './models/privilege.model';

@Injectable()
export class PrivilegeDataSourceService extends DataSourceService<Privilege>{

  protected api = `${this.serverUrl}/privileges`;

  constructor(http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }  
}
