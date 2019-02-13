import { HttpHeaders, HttpParams, HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, tap, flatMap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

@Injectable({ providedIn: "root" })
export class Es3HttpClient extends HttpClient {
  public constructor(handler: HttpHandler, private loaderService: LoaderService) {
    super(handler)
  }

  Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.get<T>(endPoint, options).pipe(finalize(()=>{
      this.loaderService.hide();
      
    }));
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