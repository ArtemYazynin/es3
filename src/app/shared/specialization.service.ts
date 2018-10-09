import { Injectable } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { Specialization } from './models/specialization.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SpecializationService {

  constructor(private http: HttpInterceptor) { }

  get(): Observable<Array<Specialization>> {
    return this.http.get("app/specializations").pipe(map(result => {
      return <Array<Specialization>>result.json();
    }));
  }
}
