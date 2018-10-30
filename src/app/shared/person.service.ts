import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { HttpInterceptor } from './http-interceptor';
import { SERVER_URL } from '../app.module';
import { Person } from './models/person.model';

@Injectable()
export class PersonService {
  private baseUrl = `${this.serverUrl}/persons`;
  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  update(document: Person): Observable<Person> {
    const url = `${this.baseUrl}/${document.id}`;
    return this.http.put(url, document).pipe(map(result => {
      return <Person>result.json();
    }));
  }
}
