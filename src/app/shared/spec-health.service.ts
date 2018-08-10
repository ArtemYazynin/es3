import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, single, first } from 'rxjs/operators';
import { HttpInterceptor } from './http-interceptor';
import { SpecHealth } from './spec-health';

@Injectable({
  providedIn: 'root'
})
export class SpecHealthService {
  private baseUrl = "app/specHealths";
  constructor(private http: HttpInterceptor) { }

  get(code?: string | number): Observable<Array<SpecHealth>> {
    let url = code ? this.baseUrl + "?code=" + code : this.baseUrl;

    return this.http.get(url).pipe(map(response => {
      return <Array<SpecHealth>>response.json();
    }));
  }
}
