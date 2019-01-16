import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './models/person.model';
import { DataSourceService } from './data-source.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class PersonService {
  private dataSource: DataSourceService<Person>;
  constructor(http: HttpClient, injector:Injector) { 
    this.dataSource = new DataSourceService<Person>(http, injector, "persons");
  }

  update(id: string, person: Person): Observable<Person> {
    return this.dataSource.put(id, person);
  }
}
