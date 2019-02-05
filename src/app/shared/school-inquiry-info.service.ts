import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSourceService } from './data-source.service';
import { InquiryService } from './inquiry.service';
import { SchoolInquiryInfo } from './models/school-inquiry-info.model';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class SchoolInquiryInfoService {
  private dataSource: DataSourceService<SchoolInquiryInfo>;
  constructor(http: Es3HttpClient, injector: Injector, private inquiryService: InquiryService) {
    this.dataSource = new DataSourceService<SchoolInquiryInfo>(http, injector, "schoolInquiryInfos");
  }

  gets(): Observable<Array<SchoolInquiryInfo>> {
    return this.dataSource.gets();
  }
  get(id: string): Observable<SchoolInquiryInfo> {
    return this.dataSource.get(id).pipe(map(x => SchoolInquiryInfo.cast(x)));
  }

  create(schoolInquiryInfo: SchoolInquiryInfo): Observable<SchoolInquiryInfo> {
    return this.dataSource.post(schoolInquiryInfo);
  }

  update(id: string, schoolInquiryInfo: SchoolInquiryInfo): Observable<SchoolInquiryInfo> {
    return this.dataSource.put(id, schoolInquiryInfo);
  }

  getByInquiry(id: string): Observable<SchoolInquiryInfo> {
    return this.inquiryService.get(id).pipe(map(x => SchoolInquiryInfo.cast(x.schoolInquiryInfo)));
  }
}
