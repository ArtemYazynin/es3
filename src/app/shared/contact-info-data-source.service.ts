import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { ContactInfo } from '.';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';

@Injectable()
export class ContactInfoDataSourceService extends DataSourceService<ContactInfo>{

  protected api = `${this.serverUrl}/conctactInfos`;

  constructor(protected http: HttpClient, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }

  put(id: string, entity: ContactInfo): Observable<ContactInfo> {
    if (!id || !entity) return empty();
    let url = `${this.api}/${id}`;
    return this.http.put<ContactInfo>(url, entity);
  }
}
