import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSourceService } from './data-source.service';
import { InquiryService } from './inquiry.service';
import { Institution } from './models/institution.model';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class InstitutionService {
  private dataSource: DataSourceService<Institution>;
  constructor(http: Es3HttpClient, injector: Injector, private inquiryService: InquiryService) {
    this.dataSource = new DataSourceService<Institution>(http, injector, "institutions");
  }

  getInstitutions(type?: number): Observable<Array<Institution>> {
    let params = type ? `institutionType=${type}` : undefined;
    return this.dataSource.gets(params)
  }

  get(id: string): Observable<Institution> {
    if (!id) return Observable.create();
    return this.dataSource.get(id);
  }

  getByInquiry(id: string): Observable<Array<Institution>> {
    return this.inquiryService.get(id).pipe(map(x => Institution.castArray(x.institutions)));
  }

  update(id: string, institution: Institution): Observable<Institution> {
    return this.dataSource.put(id, institution);
  }

  create(institution: Institution): Observable<Institution> {
    return this.dataSource.post(institution);
  }
}
