import { Injectable, Inject } from '@angular/core';
import { DataSourceService } from './shared/data-source.service';
import { InquiryInfo } from './shared';
import { HttpInterceptor } from './shared/http-interceptor';
import { SERVER_URL } from './app.module';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class InquiryInfoDataSourceService extends DataSourceService<InquiryInfo>{

  protected api = `${this.serverUrl}/inquiryInfos`;

  constructor(protected http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }

  put(id: string, entity: InquiryInfo): Observable<InquiryInfo> {
    if (!id || !entity) return empty();
    let url = `${this.api}/${id}`;
    return this.http.put(url, entity).pipe(map(response => response.json()));
  }
}
