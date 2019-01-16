import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './models/person.model';
import { PersonDataSourceService } from './person-data-source.service';


@Injectable()
export class PersonService {
  constructor(private dataSource:PersonDataSourceService) { }

  update(id: string, person: Person): Observable<Person> {
    return this.dataSource.put(id, person);
  }
}
