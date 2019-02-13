import { HttpClient } from '@angular/common/http';
import { empty, Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { SERVER_URL } from '../app.module';
import { Es3HttpClient } from './es3-http-client';
import { tap, delay } from 'rxjs/operators';

export class DataSourceService<T>{
  private _api = `${this.injector.get(SERVER_URL)}/${this.name}`;
  get api() {
    return this._api;
  }
  constructor(private http: Es3HttpClient, private injector: Injector, private name: string) {
  }

  private getRandomThrottle() {
    const min = 2000;
    const max = 6000;
    return Math.round(Math.random() * (max - min) + min);
  }

  gets(queryParams?: string): Observable<Array<T>> {
    let url = queryParams ? `${this._api}?${queryParams}` : this._api;
    return this.http.Get<Array<T>>(url).pipe(delay(this.getRandomThrottle()));
  }

  get(id: string | number): Observable<T> {
    if (!id) return empty();
    const url = `${this._api}/${id}`;
    return this.http.Get<T>(url);
 
  }

  put(id: string | number, entity: T): Observable<T> {
    if (!id || !entity) return empty();
    let url = `${this._api}/${id}`;
    return this.http.Put<T>(url, entity);
  }

  post(entity: T): Observable<T> {
    if (!entity) return empty();
    return this.http.Post<T>(this._api, entity);
  }
}
