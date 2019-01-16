import { Injectable, Inject } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { Person } from './models/person.model';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../app.module';

@Injectable()
export class PersonDataSourceService extends DataSourceService<Person> {
  protected api = `${this.serverUrl}/persons`;

  constructor(protected http: HttpClient, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }

}
