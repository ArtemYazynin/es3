import { Injectable, Inject } from '@angular/core';
import { SpecHealth } from './models/spec-health.model';
import { DataSourceService } from './data-source.service';
import { Http } from '@angular/http';
import { SERVER_URL } from '../app.module';

@Injectable()
export class SpecHealthDataSourceService extends DataSourceService<SpecHealth>{
  protected api = `${this.serverUrl}/specHealths`;

  constructor(http: Http, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
