import { Inject, Injectable } from '@angular/core';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpClient } from '@angular/common/http';
import { SpecHealth } from './models/spec-health.model';

@Injectable()
export class SpecHealthDataSourceService extends DataSourceService<SpecHealth>{
  protected api = `${this.serverUrl}/specHealths`;

  constructor(http: HttpClient, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
