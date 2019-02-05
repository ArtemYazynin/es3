import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../app.module';
import { DisabilityType } from './models/disability-type.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class DisabilityService {
  private api = `${this.serverUrl}/disabilities`;
  constructor(private http:Es3HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  get():Observable<Array<DisabilityType>>{
    return this.http.Get(this.api).pipe(map(result => {
      return <Array<DisabilityType>>result;
    }));
  }
}
