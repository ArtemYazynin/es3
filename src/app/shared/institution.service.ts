import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { DataSourceService } from './data-source.service';
import { InquiryService } from './inquiry.service';
import { Entity } from './models/entity.model';
import { Institution } from './models/institution.model';
import { SERVER_URL } from '../app.module';

@Injectable()
export class InstitutionService {
  private dataSource: DataSourceService<Institution>;
  constructor(private http: HttpClient, private injector: Injector, private inquiryService: InquiryService) {
    this.dataSource = new DataSourceService<Institution>(http, injector, "institutions");
  }

  getTypes(id?: number): Observable<Array<Entity<number>>> {
    const url = isNullOrUndefined(id)
      ? `${this.injector.get(SERVER_URL)}/institutionsTypes`
      : `${this.injector.get(SERVER_URL)}/institutionsTypes` + "/" + id
    return this.http.get(url).pipe(map(result => {
      return <Array<Entity<number>>>result;
    }));
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
