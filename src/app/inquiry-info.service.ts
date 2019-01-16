import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InquiryInfo, InquiryService } from './shared';
import { DataSourceService } from './shared/data-source.service';

@Injectable()
export class InquiryInfoService {
  private dataSource: DataSourceService<InquiryInfo>;
  constructor(http: HttpClient, injector:Injector, private inquiryService: InquiryService) { 
    this.dataSource = new DataSourceService<InquiryInfo>(http, injector, "inquiryInfos");
  }

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
