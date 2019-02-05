import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSourceService } from './data-source.service';
import { InquiryService } from './inquiry.service';
import { FileAttachment } from './models/file-attachment.model';
import { FilesInfo } from './models/files-info.model';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class FileAttachmentService {
  private dataSource: DataSourceService<FileAttachment>;
  constructor(http: Es3HttpClient, injector: Injector, private inquiryService: InquiryService) {
    this.dataSource = new DataSourceService<FileAttachment>(http, injector, "fileAttachments");
  }

  gets(): Observable<Array<FileAttachment>> {
    return this.dataSource.gets();
  }

  get(id: string): Observable<FileAttachment> {
    return this.dataSource.get(id).pipe(map(x => FileAttachment.cast(x)));
  }

  create(contactInfo: FileAttachment): Observable<FileAttachment> {
    return this.dataSource.post(contactInfo);
  }

  update(id: string, contactInfo: FileAttachment): Observable<FileAttachment> {
    return this.dataSource.put(id, contactInfo);
  }

  getsByInquiry(id: string): Observable<FilesInfo> {
    return this.inquiryService.get(id).pipe(map(x => {
      let result = new FilesInfo(x.files, x.haveDigitalSignature);
      return result;
    }));
  }
}
