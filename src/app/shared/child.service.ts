import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InquiryService } from './inquiry.service';
import { Child } from './models/child.model';
import { DataSourceService } from './data-source.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChildService {
  private dataSource: DataSourceService<Child>;
  constructor(http: HttpClient, injector: Injector, private inquiryService: InquiryService) {
    this.dataSource = new DataSourceService<Child>(http, injector, "children");
  }

  gets(): Observable<Array<Child>> {
    return this.dataSource.gets();
  }
  get(id: string): Observable<Child> {
    return this.dataSource.get(id).pipe(map(x => {
      let child = new Child(x.lastname, x.firstname, x.middlename, x.snils, x.noMiddlename, x.birthDate, x.birthPlace, x.gender, x.citizenships, x.specHealthDocument, x.identityCard);
      return child;
    }));
  }

  create(specHealth: Child) {
    return this.dataSource.post(specHealth);
  }

  update(id: string, specHealth: Child) {
    return this.dataSource.put(id, specHealth);
  }

  getsByInquiry(id: string): Observable<Array<Child>> {
    return this.inquiryService.get(id).pipe(map(x => x.children));
  }
}
