import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inquiry } from '../modules/wizard/shared';
import { HttpInterceptor } from './http-interceptor';
import { Guid } from './models/guid';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpInterceptor) { }

  create(inquiry: Inquiry): Observable<Inquiry> {
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    inquiry.id = Guid.newGuid();
    return this.http.post("app/inquiries", inquiry, options).pipe(map(result => {
      return <Inquiry>result.json();
    }));
  }
}
