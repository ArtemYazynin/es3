import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { SERVER_URL } from '../app.module';
import { RelationType } from './models/relation-type.model';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class RelationTypeService {

  constructor(private http:Es3HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  get(): Observable<Array<RelationType>> {
    return this.http.Get(`${this.serverUrl}/relationTypes`).pipe(map(result => {
      return <Array<RelationType>>result;
    }));
  }
}
