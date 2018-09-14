import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { WizardStorageService } from '../modules/wizard/shared';
import { HttpInterceptor } from './http-interceptor';
import { Guid } from './models/guid';
import { RegisterSource } from './models/register-source.enum';
import { PortalIdentity } from './models/portal-identity';
import { Status } from './models/status';
import { Inquiry } from './models/inquiry';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseUrl = "app/inquiries"
  constructor(private http: HttpInterceptor, private storageService: WizardStorageService) { }

  create(inquiry: Inquiry): Observable<Inquiry> {
    // let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    // inquiry.id = Guid.newGuid();
    // return this.http.post(this.baseUrl, inquiry, options).pipe(map(result => {
    //   return <Inquiry>result.json();
    // }));
    inquiry.id = Guid.newGuid();
    inquiry.version = new Date();
    inquiry.registerDateTime = new Date();
    inquiry.number = "46205/ЗЗ/18091213";
    inquiry.registerSource = RegisterSource.Ws;
    inquiry.addInformation = "доп. инфа по заявлению";
    inquiry.portalIdentity = new PortalIdentity(Guid.newGuid(), "123 внешний id");
    inquiry.status = new Status(Guid.newGuid(), "Новое");
    this.storageService.set("preschool", inquiry);
    return of(this.storageService.get("preschool"));
  }

  get(id: string): Observable<Inquiry> {
    if (!id) return Observable.create();
    return of(this.storageService.get("preschool"));
    // const url = `${this.baseUrl}?id=${id}`;
    // return this.http.get(url).pipe(map(result => {
    //   const inquiries = <Array<Inquiry>>result.json();
    //   return inquiries[0];
    // }));
  }
}
