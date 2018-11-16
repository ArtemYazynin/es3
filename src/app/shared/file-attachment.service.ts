import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileAttachmentDataSourceService } from './file-attachment-data-source.service';
import { FileAttachment } from './models/file-attachment.model';

@Injectable()
export class FileAttachmentService{

  constructor(private dataSource: FileAttachmentDataSourceService){

  }

  gets(): Observable<Array<FileAttachment>> {
    return this.dataSource.gets();
  }ng
  get(id: string): Observable<FileAttachment> {
    return this.dataSource.get(id).pipe(map(x => FileAttachment.cast(x)));
  }

  create(contactInfo: FileAttachment): Observable<FileAttachment> {
    return this.dataSource.post(contactInfo);
  }

  update(id: string, contactInfo: FileAttachment): Observable<FileAttachment> {
    return this.dataSource.put(id, contactInfo);
  }

  // getByInquiry(id: string): Observable<FileAttachment> {
  //   return this.inquiryService.get(id).pipe(map(x => FileAttachment.cast(x.contactInfo)));
  // }
}
