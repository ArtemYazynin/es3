import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../app.module';
import { DisabilityType } from './models/disability-type.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DisabilityService {
  private api = `${this.serverUrl}/disabilities`;
  constructor(private http:HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  get():Observable<Array<DisabilityType>>{
    return this.http.get(this.api).pipe(map(result => {
      return <Array<DisabilityType>>result;
    }));
  }
}
