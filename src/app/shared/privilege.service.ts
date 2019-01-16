import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { DataSourceService } from './data-source.service';
import { InquiryService } from './inquiry.service';
import { Privilege } from './models/privilege.model';

@Injectable()
export class PrivilegeService {
  private dataSource: DataSourceService<Privilege>;
  constructor(http: HttpClient, injector:Injector, private inquiryService: InquiryService) { 
    this.dataSource = new DataSourceService<Privilege>(http, injector, "privileges");
  }

  gets(privilegeOrderId?: string | number): Observable<Array<Privilege>> {
    const queryParams = privilegeOrderId ? `privilegeOrderId=${privilegeOrderId}` : undefined;
    return this.dataSource.gets(queryParams);
  }
  get(id: string): Observable<Privilege> {
    return this.dataSource.get(id).pipe(map(x => new Privilege(x.id, x.name, x.privilegeOrder)));
  }

  create(privilege: Privilege) {
    return this.dataSource.post(privilege);
  }

  update(id: string, privilege: Privilege) {
    return this.dataSource.put(id, privilege);
  }

  getByInquiry(id: string): Observable<Privilege> {
    return this.inquiryService.get(id).pipe(map(x => x.privilege));
  }
}
