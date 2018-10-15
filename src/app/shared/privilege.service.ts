import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { HttpInterceptor } from './http-interceptor';
import { Privilege } from './models/privilege.model';
import { FormGroup } from '@angular/forms';
import { SERVER_URL } from '../app.module';

@Injectable()
export class PrivilegeService {

  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  get(privilegeOrderId?: string): Observable<Array<Privilege>> {
    let url = (() => {
      let base = `${this.serverUrl}/privileges`;

      return privilegeOrderId ? base + "?privilegeOrderId=" + privilegeOrderId : base;
    })();

    return this.http.get(url).pipe(map(result => {
      return <Array<Privilege>>result.json();
    }));
  }
}
