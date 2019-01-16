import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { SERVER_URL } from './app.module';
import { InquiryInfo } from './shared';
import { DataSourceService } from './shared/data-source.service';

@Injectable()
export class InquiryInfoDataSourceService extends DataSourceService<InquiryInfo>{

  protected api = `${this.serverUrl}/inquiryInfos`;

  constructor(protected http: HttpClient, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }

  put(id: string, entity: InquiryInfo): Observable<InquiryInfo> {
    if (!id || !entity) return empty();
    let url = `${this.api}/${id}`;
    return this.http.put<InquiryInfo>(url, entity);
  }
}
