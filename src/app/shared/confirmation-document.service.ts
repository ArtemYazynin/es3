import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmationDocumentDataSourceService } from './confirmation-document-data-source.service';
import { ConfirmationDocument } from './models/confirmation-document.model';

@Injectable()
export class ConfirmationDocumentService {

  constructor(private dataSource: ConfirmationDocumentDataSourceService) { }

  create(doc: ConfirmationDocument): Observable<ConfirmationDocument> {
    return this.dataSource.post(doc);
  }

  update(id: string, doc: ConfirmationDocument): Observable<ConfirmationDocument> {
    return this.dataSource.put(id, doc);
  }

  gets(): Observable<Array<ConfirmationDocument>> {
    return this.dataSource.gets();
  }

  get(id: string): Observable<ConfirmationDocument> {
    return this.dataSource.get(id);
  }
}
