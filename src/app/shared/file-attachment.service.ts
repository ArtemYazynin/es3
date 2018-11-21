import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileAttachmentDataSourceService } from './file-attachment-data-source.service';
import { FileAttachment } from './models/file-attachment.model';
import { InquiryService } from './inquiry.service';
import { FilesInfo } from './models/files-info.model';

@Injectable()
export class FileAttachmentService {
  constructor(private dataSource: FileAttachmentDataSourceService, private inquiryService: InquiryService) {

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
