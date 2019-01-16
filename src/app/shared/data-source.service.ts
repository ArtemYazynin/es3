import { HttpClient } from '@angular/common/http';
import { empty, Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { SERVER_URL } from '../app.module';

export class DataSourceService<T>{
  private api = `${this.injector.get(SERVER_URL)}/${this.name}`;
  constructor(private http: HttpClient, private injector:Injector, private name:string) {
  }

  gets(queryParams?: string): Observable<Array<T>> {
    let url = queryParams ? `${this.api}?${queryParams}` : this.api;
    return this.http.get<Array<T>>(url);
  }

  get(id: string): Observable<T> {
    const url = `${this.api}/${id}`;
    return this.http.get<T>(url);

  }

  put(id: string, entity: T): Observable<T> {
    if (!id || !entity) return empty();
    let url = `${this.api}/${id}`;
    return this.http.put<T>(url,entity);
  }

  post(entity: T): Observable<T> {
    return this.http.post<T>(this.api,entity);
  }
}
