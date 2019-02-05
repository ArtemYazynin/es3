import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { DataSourceService } from './data-source.service';
import { InquiryService } from './inquiry.service';
import { Entity } from './models/entity.model';
import { SchoolClass } from './models/school-class.model';
import { SERVER_URL } from '../app.module';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class SchoolClassService {
  private dataSource: DataSourceService<SchoolClass>;
  constructor(private http: Es3HttpClient, private injector: Injector, private inquiryService: InquiryService) {
    this.dataSource = new DataSourceService<SchoolClass>(http, injector, "schoolClasses");
  }

  private api = {
    institutionsTypes: `${this.injector.get(SERVER_URL)}/institutionsTypes`,
  }
  getTypes(id?: number): Observable<Array<Entity<number>>> {
    const url = isNullOrUndefined(id)
      ? this.api.institutionsTypes
      : this.api.institutionsTypes + "/" + id
    return this.http.Get(url).pipe(map(result => {
      return <Array<Entity<number>>>result;
    }));
  }
  getInstitutions(type?: number): Observable<Array<SchoolClass>> {
    let params = type ? `institutionType=${type}` : undefined;
    return this.dataSource.gets(params)
  }

  get(id: string): Observable<SchoolClass> {
    if (!id) return Observable.create();
    return this.dataSource.get(id);
  }

  getByInquiry(id: string): Observable<Array<SchoolClass>> {
    return this.inquiryService.get(id).pipe(map(x => SchoolClass.castArray(x.schoolClasses)));
  }

  update(id: string, schoolClass: SchoolClass): Observable<SchoolClass> {
    return this.dataSource.put(id, schoolClass);
  }

  create(schoolClass: SchoolClass): Observable<SchoolClass> {
    return this.dataSource.post(schoolClass);
  }
}
