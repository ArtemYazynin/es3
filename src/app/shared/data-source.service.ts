import { Headers, Http, Request, RequestMethod } from '@angular/http';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptor } from './http-interceptor';

export abstract class DataSourceService<T>{
  protected abstract api: string;
  protected headers = new Headers({"Content-Type":"application/json"});
  constructor(protected http: HttpInterceptor) {
  }

  gets(queryParams?: string): Observable<Array<T>> {
    let url = queryParams ? `${this.api}?${queryParams}` : this.api;
    return this.sendRequest(RequestMethod.Get, url);
  }

  get(id: string): Observable<T> {
    const url = `${this.api}/${id}`;
    return this.sendRequest(RequestMethod.Get, url);
  }

  put(id: string, entity: T): Observable<T> {
    if (!id || !entity) return empty();
    let url = `${this.api}/${id}`;
    return this.sendRequest(RequestMethod.Put, url, entity);
  }

  post(entity: T): Observable<T> {
    return this.sendRequest(RequestMethod.Post, this.api, entity);
  }

  private sendRequest(verb: RequestMethod, url: string, body?: T) {
    // let headers = new Headers();
    // headers.set("Content-Type", "application/json")
    return this.http.request(new Request({
      method: verb,
      url: url,
      body: body,
      headers: body ? this.headers : undefined
    })).pipe(map(response => response.json()));
  }
}