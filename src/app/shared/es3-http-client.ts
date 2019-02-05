import { HttpHeaders, HttpParams, HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

export function es3HttpClientCreator(httpHandler: HttpHandler) {
  return new Es3HttpClient(httpHandler);
}

@Injectable({providedIn:"root"})
export class Es3HttpClient extends HttpClient {
  public constructor(handler: HttpHandler) {
    super(handler)
  }

  Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.get<T>(endPoint, options);
  }

  public Post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.post<T>(endPoint, params, options);
  }

  public Put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.put<T>(endPoint, params, options);
  }

  public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.delete<T>(endPoint, options);
  }
}