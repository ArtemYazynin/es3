import { Inject, Injectable } from '@angular/core';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpInterceptor } from './http-interceptor';
import { Child } from './models/child.model';

@Injectable()
export class ChildDataSourceService extends DataSourceService<Child>{
  protected api = `${this.serverUrl}/children`;

  constructor(http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
