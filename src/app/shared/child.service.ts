import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChildDataSourceService } from './child-data-source.service';
import { InquiryService } from './inquiry.service';
import { Child } from './models/child.model';

@Injectable()
export class ChildService {

  constructor(private dataSource: ChildDataSourceService, private inquiryService: InquiryService) { }

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
