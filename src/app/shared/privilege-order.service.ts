import { Injectable } from '@angular/core';
import { PrivilegeOrder } from './models/privilege-order.model';
import { Observable } from 'rxjs';
import { HttpInterceptor } from './http-interceptor';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class PrivilegeOrderService {

  constructor(private http: HttpInterceptor) { }

  get():Observable<Array<PrivilegeOrder>>{
    return this.http.get("app/privilegeOrders").pipe(map(result => {
      return <Array<PrivilegeOrder>>result.json();
    }));
  }
}
