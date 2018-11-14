import { Inject, Injectable } from '@angular/core';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpInterceptor } from './http-interceptor';
import { SpecHealth } from './models/spec-health.model';

@Injectable()
export class SpecHealthDataSourceService extends DataSourceService<SpecHealth>{
  protected api = `${this.serverUrl}/specHealths`;

  constructor(http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
