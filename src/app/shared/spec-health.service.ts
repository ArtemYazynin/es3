import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Entity } from './entity';
import { HttpInterceptor } from './http-interceptor';
import { map } from 'rxjs/operators';
import { SpecHealth } from './spec-health';

@Injectable({
  providedIn: 'root'
})
export class SpecHealthService {

  constructor(private http: HttpInterceptor) { }

  get():Observable<Array<SpecHealth>>{
    return this.http.get("app/specHealths").pipe(map(result => {
      return <Array<SpecHealth>>result.json();
    }));
  }
}
