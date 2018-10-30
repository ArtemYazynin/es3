import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { Specialization } from './models/specialization.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SERVER_URL } from '../app.module';

@Injectable()
export class SpecializationService {

  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  get(): Observable<Array<Specialization>> {
    return this.http.get(`${this.serverUrl}/specializations`).pipe(map(result => {
      return <Array<Specialization>>result.json();
    }));
  }
}
