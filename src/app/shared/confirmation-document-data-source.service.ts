import { Injectable, Inject } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { ConfirmationDocument } from './models/confirmation-document.model';
import { Http } from '@angular/http';
import { SERVER_URL } from '../app.module';

@Injectable()
export class ConfirmationDocumentDataSourceService extends DataSourceService<ConfirmationDocument>{
  protected api = `${this.serverUrl}/confirmationDocuments`;
  constructor(http: Http, @Inject(SERVER_URL) private serverUrl) {
    super(http)
  }
}
