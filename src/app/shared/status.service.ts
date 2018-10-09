import { Injectable } from '@angular/core';
import { Status } from './models/status.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpInterceptor } from './http-interceptor';
import { map } from 'rxjs/operators';

@Injectable()
export class StatusService {

  constructor(private http:HttpInterceptor) { }

  get(): Observable<Array<Status>> {
    return this.http.get("app/statuses").pipe(map(result=>{
      return <Array<Status>>result.json();
    }))
  }
}
