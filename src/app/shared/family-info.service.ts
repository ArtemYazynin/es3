import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_URL } from '../app.module';
import { FamilyInfo } from './models/family-info.model';

@Injectable()
export class FamilyInfoService {
  private baseUrl = `app/familiesInfos`;

  constructor(private http: Http, @Inject(SERVER_URL) private serverUrl) { }

  gets(): Observable<Array<FamilyInfo>> {
    return this.http.get(this.baseUrl).pipe(map(result => {
      return <Array<FamilyInfo>>result.json();
    }))
  }
}
