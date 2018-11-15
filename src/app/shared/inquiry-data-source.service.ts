import { Injectable, Inject } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { Inquiry } from '.';
import { SERVER_URL } from '../app.module';
import { Http } from '@angular/http';
import { HttpInterceptor } from './http-interceptor';

@Injectable()
export class InquiryDataSourceService extends DataSourceService<Inquiry>{
  protected api = `${this.serverUrl}/inquiries`;

  constructor(http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http)
  }
}