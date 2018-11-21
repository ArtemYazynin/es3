import { Injectable, Inject } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { FileAttachment } from '.';
import { HttpInterceptor } from './http-interceptor';
import { SERVER_URL } from '../app.module';

@Injectable()
export class FileAttachmentDataSourceService extends DataSourceService<FileAttachment>{

  protected api = `${this.serverUrl}/fileAttachments`;

  constructor(protected http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
