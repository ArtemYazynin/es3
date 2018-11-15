import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SchoolInquiryInfo } from './models/school-inquiry-info.model';
import { SchoolInquiryInfoDataSourceService } from './school-inquiry-info-data-source.service';
import { InquiryService } from './inquiry.service';

@Injectable()
export class SchoolInquiryInfoService {
  constructor(private dataSource: SchoolInquiryInfoDataSourceService, private inquiryService: InquiryService) {

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
