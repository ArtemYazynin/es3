import { Injectable, Inject } from '@angular/core';
import { EducProgramType } from './educ-program-type.enum';
import { EducProgram } from './models/educ-program.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_URL } from '../app.module';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class EducProgramService {
  constructor(private http:Es3HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  get(type?: EducProgramType): Observable<Array<EducProgram>> {
    const api = `${this.serverUrl}/educPrograms`;
    const url = !!type ? `${api}?educProgramType=${type}` : api;
    return this.http.Get(url).pipe(map(result => {
      return <Array<EducProgram>>result;
    }));
  }
}
