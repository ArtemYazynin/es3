import { Injectable, Inject } from '@angular/core';
import { ConfirmationDocument } from './models/confirmation-document.model';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../app.module';
import { map } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { Guid } from './models/guid';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class ConfirmationDocumentService {
  private baseUrl = `${this.serverUrl}/confirmationDocuments`;

  constructor(private http:Es3HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  create(document: ConfirmationDocument): Observable<ConfirmationDocument> {
    document.id = Guid.newGuid();
    return this.http.Post(this.baseUrl, document).pipe(map(result => {
      return <ConfirmationDocument>result;
    }));
  }
  update(document: ConfirmationDocument): Observable<ConfirmationDocument> {
    const url = `${this.baseUrl}/${document.id}`;
    return this.http.Put(url, document).pipe(map(result => {
      return <ConfirmationDocument>result;
    }));
  }

  get(id: string) {
    if (!id) return empty();
    const url = `${this.baseUrl}/${id}`;
    return this.http.Get(url).pipe(map(result => {
      return <ConfirmationDocument>result;
    }));
  }
}
