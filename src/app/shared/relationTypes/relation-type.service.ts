import { Injectable } from '@angular/core';
import { RelationType } from './relation-type';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";
import { HttpInterceptor } from '../http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class RelationTypeService {

  constructor(private http: HttpInterceptor) { }

  get():Observable<Array<RelationType>>{
    return this.http.get("app/relationTypes").pipe(map(result=>{
      return <Array<RelationType>> result.json();
    }));
  }
}
