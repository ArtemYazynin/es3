import { Injectable } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { CompilationOfWizardSteps } from '../wizard/shared/compilation-of-wizard-steps';
import { Guid } from './guid';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpInterceptor) { }

  create(inquiry: CompilationOfWizardSteps): Observable<CompilationOfWizardSteps> {
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    inquiry.id = Guid.newGuid();
    return this.http.post("app/inquiries", inquiry, options).pipe(map(result => {
      return <CompilationOfWizardSteps>result.json();
    }));
  }
}
