import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { empty, Observable } from 'rxjs';

export abstract class DataSourceService<T>{
  protected abstract api: string;
  protected headers = new Headers({"Content-Type":"application/json"});
  constructor(protected http: HttpClient) {
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
