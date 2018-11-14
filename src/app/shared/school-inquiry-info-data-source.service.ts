import { Injectable, Inject } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { SchoolInquiryInfo } from '.';
import { HttpInterceptor } from './http-interceptor';
import { SERVER_URL } from '../app.module';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SchoolInquiryInfoDataSourceService extends DataSourceService<SchoolInquiryInfo>{

  protected api = `${this.serverUrl}/schoolInquiryInfos`;

  constructor(protected http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }

  put(id: string, entity: SchoolInquiryInfo): Observable<SchoolInquiryInfo> {
    if (!id || !entity) return empty();
    let url = `${this.api}/${id}`;
    return this.http.put(url, entity).pipe(map(response => response.json()));
  }
}
 