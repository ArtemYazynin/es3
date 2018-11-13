import { Injectable, Inject } from '@angular/core';
import { IdentityCard } from './models/identityCard.model';
import { DataSourceService } from './data-source.service';
import { Http } from '@angular/http';
import { SERVER_URL } from '../app.module';

@Injectable()
export class IdentityCardDataSourceService extends DataSourceService<IdentityCard>{
  protected api = `${this.serverUrl}/identityCards`;

  constructor(http: Http, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
