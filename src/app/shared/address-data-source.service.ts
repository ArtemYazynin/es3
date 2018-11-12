import { Injectable, Inject } from '@angular/core';
import { Address, AddressVm } from './models/address.model';
import { DataSourceService } from './data-source.service';
import { Http } from '@angular/http';
import { SERVER_URL } from '../app.module';

@Injectable()
export class AddressDataSourceService extends DataSourceService<AddressVm> {
  protected api = `${this.serverUrl}/addresses`;

  constructor(http: Http, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
