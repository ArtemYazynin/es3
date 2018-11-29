import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { SERVER_URL } from '../app.module';
import { HttpInterceptor } from './http-interceptor';
import { InquiryService } from './inquiry.service';
import { Entity } from './models/entity.model';
import { SchoolClass } from './models/school-class.model';
import { SchoolClassDataSourceService } from './school-classes-data-source.service';

@Injectable()
export class SchoolClassService {

  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl, private dataSource: SchoolClassDataSourceService, private inquiryService: InquiryService) { }

  private api = {
    institutionsTypes: `${this.serverUrl}/institutionsTypes`,
  }
  getTypes(id?: number): Observable<Array<Entity<number>>> {
    const url = isNullOrUndefined(id)
      ? this.api.institutionsTypes
      : this.api.institutionsTypes + "/" + id
    return this.http.get(url).pipe(map(result => {
      return <Array<Entity<number>>>result.json();
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
    return this.inquiryService.get(id).pipe(map(x => SchoolClass.cast(x.schoolClasses)));
  }

  update(id: string, schoolClass: SchoolClass): Observable<SchoolClass> {
    return this.dataSource.put(id, schoolClass);
  }

  create(schoolClass: SchoolClass): Observable<SchoolClass> {
    return this.dataSource.post(schoolClass);
  }
}
