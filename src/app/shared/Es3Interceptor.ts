import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Inquiry } from './models/inquiry.model';
import { LoaderService } from './loader.service';

@Injectable()
export class Es3Interceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService){
        
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        if (!(req.body instanceof Inquiry) && (req.method === "PUT" || req.method === "POST")) {
            return of(new HttpResponse({
                body: req.body
            }));
        }
        return next.handle(req);
    }
}