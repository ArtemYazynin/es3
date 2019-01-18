import { HttpClient } from '@angular/common/http';
import { empty, Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { SERVER_URL } from '../app.module';

export class DataSourceService<T>{
  private _api = `${this.injector.get(SERVER_URL)}/${this.name}`;
  get api() {
    return this._api;
  }
  constructor(private http: HttpClient, private injector: Injector, private name: string) {
  }

  gets(queryParams?: string): Observable<Array<T>> {
    let url = queryParams ? `${this._api}?${queryParams}` : this._api;
    return this.http.get<Array<T>>(url);
  }

  get(id: string): Observable<T> {
    const url = `${this._api}/${id}`;
    return this.http.get<T>(url);

  }

  put(id: string, entity: T): Observable<T> {
    if (!id || !entity) return empty();
    let url = `${this._api}/${id}`;
    return this.http.put<T>(url, entity);
  }

  post(entity: T): Observable<T> {
    if (!entity) return empty();
    return this.http.post<T>(this._api, entity);
  }
}
