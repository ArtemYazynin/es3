import { Injectable, Inject } from '@angular/core';
import { Status } from './models/status.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { SERVER_URL } from '../app.module';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StatusService {

  constructor(private http:HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  get(): Observable<Array<Status>> {
    return this.http.get(`${this.serverUrl}/statuses`).pipe(map(result=>{
      return <Array<Status>>result;
    }))
  }
}
