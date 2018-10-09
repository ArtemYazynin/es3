import { Injectable } from '@angular/core';
import { EducProgramType } from './educ-program-type.enum';
import { EducProgram } from './models/educ-program.model';
import { HttpInterceptor } from './http-interceptor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EducProgramService {
  private baseUrl = "app/educPrograms";
  constructor(private http: HttpInterceptor) { }

  get(type?: EducProgramType): Observable<Array<EducProgram>> {
    const url = !!type ? `${this.baseUrl}?educProgramType=${type}` : this.baseUrl;
    return this.http.get(url).pipe(map(result => {
      return <Array<EducProgram>>result.json();
    }));
  }
}
