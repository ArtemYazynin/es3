import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactInfo, InquiryService } from '.';
import { ContactInfoDataSourceService } from './contact-info-data-source.service';

@Injectable()
export class ContactInfoService {

  constructor(private dataSource: ContactInfoDataSourceService, private inquiryService: InquiryService) { }

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
