import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Specialization } from './models/specialization.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SERVER_URL } from '../app.module';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class SpecializationService {

  constructor(private http:Es3HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  get(): Observable<Array<Specialization>> {
    return this.http.Get(`${this.serverUrl}/specializations`).pipe(map(result => {
      return <Array<Specialization>>result;
    }));
  }
}
