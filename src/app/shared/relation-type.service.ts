import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpInterceptor } from './http-interceptor';
import { RelationType } from './models/relation-type';

@Injectable({
  providedIn: 'root'
})
export class RelationTypeService {

  constructor(private http: HttpInterceptor) { }

  get(): Observable<Array<RelationType>> {
    return this.http.get("app/relationTypes").pipe(map(result => {
      return <Array<RelationType>>result.json();
    }));
  }
}
