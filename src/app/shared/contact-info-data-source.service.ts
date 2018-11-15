import { Injectable, Inject } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { ContactInfo } from '.';
import { HttpInterceptor } from './http-interceptor';
import { SERVER_URL } from '../app.module';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactInfoDataSourceService extends DataSourceService<ContactInfo>{

  protected api = `${this.serverUrl}/conctactInfos`;

  constructor(protected http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }

  put(id: string, entity: ContactInfo): Observable<ContactInfo> {
    if (!id || !entity) return empty();
    let url = `${this.api}/${id}`;
    return this.http.put(url, entity).pipe(map(response => response.json()));
  }
}
