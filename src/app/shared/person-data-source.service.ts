import { Injectable, Inject } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { Person } from '.';
import { Http } from '@angular/http';
import { SERVER_URL } from '../app.module';

@Injectable()
export class PersonDataSourceService extends DataSourceService<Person>{
  protected api = `${this.serverUrl}/persons`;

  constructor(http: Http, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
