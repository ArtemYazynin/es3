import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_URL } from '../app.module';
import { FamilyInfo } from './models/family-info.model';
import { HttpClient } from '@angular/common/http';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class FamilyInfoService {
  private baseUrl = `${this.serverUrl}/familiesInfos`;

  constructor(private http: Es3HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  gets(): Observable<Array<FamilyInfo>> {
    return this.http.Get(this.baseUrl).pipe(map(result => {
      return <Array<FamilyInfo>>result;
    }))
  }
}
