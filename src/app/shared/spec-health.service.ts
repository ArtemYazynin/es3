import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { HttpInterceptor } from './http-interceptor';
import { SpecHealth } from './models/spec-health.model';
import { SERVER_URL } from '../app.module';

@Injectable()
export class SpecHealthService {
  private baseUrl = `${this.serverUrl}/specHealths`;
  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  get(code?: string | number): Observable<Array<SpecHealth>> {
    let url = code ? this.baseUrl + "?code=" + code : this.baseUrl;
    return this.http.get(url).pipe(map(response => {
      return <Array<SpecHealth>>response.json();
    }));
  }
}
