import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpInterceptor } from './http-interceptor';
import { RelationType } from './models/relation-type.model';
import { SERVER_URL } from '../app.module';

@Injectable()
export class RelationTypeService {

  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  get(): Observable<Array<RelationType>> {
    return this.http.get(`${this.serverUrl}/relationTypes`).pipe(map(result => {
      return <Array<RelationType>>result.json();
    }));
  }
}
