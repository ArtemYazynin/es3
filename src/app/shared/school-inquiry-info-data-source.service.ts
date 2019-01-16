import { Injectable, Inject } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { SchoolInquiryInfo } from '.';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../app.module';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SchoolInquiryInfoDataSourceService extends DataSourceService<SchoolInquiryInfo>{

  protected api = `${this.serverUrl}/schoolInquiryInfos`;

  constructor(protected http: HttpClient, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
 