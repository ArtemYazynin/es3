import { Injectable } from '@angular/core';
import { InquiryInfoDataSourceService } from './inquiry-info-data-source.service';
import { Observable } from 'rxjs';
import { SchoolInquiryInfo, InquiryInfo, InquiryService } from './shared';
import { map } from 'rxjs/operators';

@Injectable()
export class InquiryInfoService {

  constructor(private dataSource:InquiryInfoDataSourceService, private inquiryService: InquiryService) { }

  gets(): Observable<Array<InquiryInfo>> {
    return this.dataSource.gets();
  }
  get(id: string): Observable<InquiryInfo> {
    return this.dataSource.get(id).pipe(map(x => InquiryInfo.cast(x)));
  }

  create(inquiryInfo: InquiryInfo): Observable<InquiryInfo> {
    return this.dataSource.post(inquiryInfo);
  }

  update(id: string, inquiryInfo: InquiryInfo): Observable<InquiryInfo> {
    return this.dataSource.put(id, inquiryInfo);
  }

  getByInquiry(id: string): Observable<InquiryInfo> {
    return this.inquiryService.get(id).pipe(map(x => InquiryInfo.cast(x.inquiryInfo)));
  }
}
