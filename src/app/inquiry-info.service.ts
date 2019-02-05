import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { InquiryInfo, InquiryService } from './shared';
import { DataSourceService } from './shared/data-source.service';
import { isNullOrUndefined, isString } from 'util';
import { Es3HttpClient } from './shared/es3-http-client';

@Injectable()
export class InquiryInfoService {
  private dataSource: DataSourceService<InquiryInfo>;
  constructor(http: Es3HttpClient, injector:Injector, private inquiryService: InquiryService) { 
    this.dataSource = new DataSourceService<InquiryInfo>(http, injector, "inquiryInfos");
  }

  gets(): Observable<Array<InquiryInfo>> {
    return this.dataSource.gets();
  }
  get(id: string): Observable<InquiryInfo> {
    if(!this.isValid(id)) return empty();
    return this.dataSource.get(id).pipe(map(x => InquiryInfo.cast(x)));
  }

  create(inquiryInfo: InquiryInfo): Observable<InquiryInfo> {
    if(!inquiryInfo) return empty();
    return this.dataSource.post(inquiryInfo);
  }

  update(id: string, inquiryInfo: InquiryInfo): Observable<InquiryInfo> {
    if(!this.isValid(id) || !inquiryInfo) return empty();
    return this.dataSource.put(id, inquiryInfo);
  }

  getByInquiry(id: string): Observable<InquiryInfo> {
    if(!this.isValid(id)) return empty();
    let result = this.inquiryService.get(id).pipe(map(x => InquiryInfo.cast(x.inquiryInfo)));
    return result;
  }

  private isValid(id:string){
    if (isNullOrUndefined(id)) {
      return false;
    } else if(isString(id) && !id.trim()){
      return false;
    }
    return true;
  }
}
