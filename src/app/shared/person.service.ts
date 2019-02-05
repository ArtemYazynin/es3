import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './models/person.model';
import { DataSourceService } from './data-source.service';
import { HttpClient } from '@angular/common/http';
import { Es3HttpClient } from './es3-http-client';


@Injectable()
export class PersonService {
  private _dataSource:DataSourceService<Person>;
  get dataSource(): DataSourceService<Person>{
    return this._dataSource;
  }

  constructor(http: Es3HttpClient, injector:Injector) { 
    this._dataSource = new DataSourceService<Person>(http, injector, "persons");
  }

  update(id: string, person: Person): Observable<Person> {
    return this.dataSource.put(id, person);
  }
}
