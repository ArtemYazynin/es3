import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactInfo, InquiryService } from '.';
import { DataSourceService } from './data-source.service';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class ContactInfoService {
  private dataSource: DataSourceService<ContactInfo>;
  constructor(http: Es3HttpClient, injector: Injector, private inquiryService: InquiryService) {
    this.dataSource = new DataSourceService<ContactInfo>(http, injector, "conctactInfos");
  }

  gets(): Observable<Array<ContactInfo>> {
    return this.dataSource.gets();
  }
  get(id: string): Observable<ContactInfo> {
    return this.dataSource.get(id).pipe(map(x => ContactInfo.cast(x)));
  }

  create(contactInfo: ContactInfo): Observable<ContactInfo> {
    return this.dataSource.post(contactInfo);
  }

  update(id: string, contactInfo: ContactInfo): Observable<ContactInfo> {
    return this.dataSource.put(id, contactInfo);
  }

  getByInquiry(id: string): Observable<ContactInfo> {
    return this.inquiryService.get(id).pipe(map(x => ContactInfo.cast(x.contactInfo)));
  }
}
