import { Injectable } from '@angular/core';
import { PrivilegeOrder } from './privilege-order';
import { Observable } from 'rxjs/internal/Observable';
import { Privilege } from './privilege';
import { HttpInterceptor } from './http-interceptor';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  constructor(private http: HttpInterceptor) { }

  get(privilegeOrderId: string):Observable<Array<Privilege>>{
    let url = (()=>{
      let base = "app/privileges";

      return privilegeOrderId ? base + "?privilegeOrderId="+privilegeOrderId : base;
    })();
    return this.http.get(url).pipe(map(result => {
      return <Array<Privilege>>result.json();
    }));
  }
}
