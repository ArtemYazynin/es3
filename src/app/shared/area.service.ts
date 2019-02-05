import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_URL } from '../app.module';
import { Area } from './models/area.model';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class AreaService {

  constructor(private http: Es3HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  getCurrentMunicipality(): Observable<Area> {
    return this.http.Get(`${this.serverUrl}/currentMunicipality`).pipe(map(result => {
      return <Area>result;
    }));
  }
}
