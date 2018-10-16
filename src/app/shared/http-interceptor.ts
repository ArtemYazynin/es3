import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend, ResponseOptions, ResponseOptionsArgs } from "@angular/http"
import { Injectable } from "@angular/core"

// operators
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpInterceptor extends Http {

    constructor(backend: XHRBackend, options: RequestOptions, public http: Http) {
        super(backend, options)
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
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

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const responseOptionsArgs = {
            body: body
        }
        return of(new Response(new ResponseOptions(responseOptionsArgs)))
    }
}