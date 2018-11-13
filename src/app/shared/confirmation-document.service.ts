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

  // create(document: ConfirmationDocument): Observable<ConfirmationDocument> {
  //   document.id = Guid.newGuid();
  //   return this.http.post(this.baseUrl, document).pipe(map(result => {
  //     return <ConfirmationDocument>result.json();
  //   }));
  // }
  // update(document: ConfirmationDocument): Observable<ConfirmationDocument> {
  //   const url = `${this.baseUrl}/${document.id}`;
  //   return this.http.put(url, document).pipe(map(result => {
  //     return <ConfirmationDocument>result.json();
  //   }));
  // }

  // get(id: string) {
  //   if (!id) return empty();
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.get(url).pipe(map(result => {
  //     return <ConfirmationDocument>result.json();
  //   }));
  // }
}
