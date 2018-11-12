import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { HttpInterceptor } from './http-interceptor';
import { SERVER_URL } from '../app.module';
import { Person } from './models/person.model';
import { PersonDataSourceService } from './person-data-source.service';

@Injectable()
export class PersonService {
  // private baseUrl = `${this.serverUrl}/persons`;
  // constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  // update(document: Person): Observable<Person> {
  //   const url = `${this.baseUrl}/${document.id}`;
  //   return this.http.put(url, document).pipe(map(result => {
  //     return <Person>result.json();
  //   }));
  // }
  constructor(private dataSource: PersonDataSourceService) {

  }

  get(id: string) {
    return this.dataSource.get(id);
  }

  gets() {
    return this.dataSource.gets();
  }

  create(person: Person) {
    return this.dataSource.post(person);
  }

  update(id: string, person: Person) {
    return this.dataSource.put(id, person);
  }
}
