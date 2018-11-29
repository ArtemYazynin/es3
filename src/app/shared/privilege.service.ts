import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { InquiryService } from './inquiry.service';
import { Privilege } from './models/privilege.model';
import { PrivilegeDataSourceService } from './privilege-data-source.service';

@Injectable()
export class PrivilegeService {

  constructor(private dataSource: PrivilegeDataSourceService, private inquiryService: InquiryService) { }

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
