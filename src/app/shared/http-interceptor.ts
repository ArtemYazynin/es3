import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http"
import { Injectable } from "@angular/core"

// operators
import { Observable,throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class HttpInterceptor extends Http {

    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public http: Http,
    ) {
        super(backend, options)
    }

    public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options)
        .pipe(catchError(err => {
            console.log(err.statusText);
            throw 'error in source. Details: ' + err;
          }))
    }

    public handleError = (error: Response) => {
            
        // Do messaging and error handling here
        return Observable.throw(error)
    }
}