import { Injectable, Inject } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { InquiryRequest } from '.';
import { SERVER_URL } from '../app.module';
import { Http } from '@angular/http';

@Injectable()
export class InquiryDataSourceService extends DataSourceService<InquiryRequest>{
  protected api = `${this.serverUrl}/inquiries`;

  constructor(http: Http, @Inject(SERVER_URL) private serverUrl) {
    super(http)
  }
}
