import { Injectable, Inject } from '@angular/core';
import { PrivilegeOrder } from './models/privilege-order.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { SERVER_URL } from '../app.module';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class PrivilegeOrderService {

  constructor(private http:Es3HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  get():Observable<Array<PrivilegeOrder>>{
    return this.http.Get(`${this.serverUrl}/privilegeOrders`).pipe(map(result => {
      return <Array<PrivilegeOrder>>result;
    }));
  }
}
