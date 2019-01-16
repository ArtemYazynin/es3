import { Inject, Injectable } from '@angular/core';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpClient } from '@angular/common/http';
import { Child } from './models/child.model';

@Injectable()
export class ChildDataSourceService extends DataSourceService<Child>{
  protected api = `${this.serverUrl}/children`;

  constructor(http: HttpClient, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
