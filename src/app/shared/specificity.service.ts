import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { Observable } from 'rxjs';
import { Specificity } from './models/specificity.model';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { SERVER_URL } from '../app.module';

@Injectable()
export class SpecificityService {

  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  private api = `${this.serverUrl}/specificities`;
  get(id?: string): Observable<Array<Specificity>> {
    const url = isNullOrUndefined(id) || id == ""
      ? this.api
      : this.api + "/" + id.trim();
    return this.http.get(url).pipe(map(result => {
      return <Array<Specificity>>result.json();
    }));
  }
}
