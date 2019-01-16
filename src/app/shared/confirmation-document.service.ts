import { Injectable, Inject } from '@angular/core';
import { ConfirmationDocument } from './models/confirmation-document.model';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../app.module';
import { map } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { Guid } from './models/guid';

@Injectable()
export class ConfirmationDocumentService {
  private baseUrl = `${this.serverUrl}/confirmationDocuments`;

  constructor(private http:HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  create(document: ConfirmationDocument): Observable<ConfirmationDocument> {
    document.id = Guid.newGuid();
    return this.http.post(this.baseUrl, document).pipe(map(result => {
      return <ConfirmationDocument>result;
    }));
  }
  update(document: ConfirmationDocument): Observable<ConfirmationDocument> {
    const url = `${this.baseUrl}/${document.id}`;
    return this.http.put(url, document).pipe(map(result => {
      return <ConfirmationDocument>result;
    }));
  }

  get(id: string) {
    if (!id) return empty();
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url).pipe(map(result => {
      return <ConfirmationDocument>result;
    }));
  }
}
