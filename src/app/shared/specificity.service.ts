import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specificity } from './models/specificity.model';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { SERVER_URL } from '../app.module';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class SpecificityService {

  constructor(private http:Es3HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  private api = `${this.serverUrl}/specificities`;
  get(id?: string): Observable<Array<Specificity>> {
    const url = isNullOrUndefined(id) || id == ""
      ? this.api
      : this.api + "/" + id.trim();
    return this.http.Get(url).pipe(map(result => {
      return <Array<Specificity>>result;
    }));
  }
}
