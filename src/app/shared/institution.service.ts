import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { SERVER_URL } from '../app.module';
import { HttpInterceptor } from './http-interceptor';
import { InquiryService } from './inquiry.service';
import { InstitutionDataSourceService } from './institution-data-source.service';
import { Entity } from './models/entity.model';
import { Institution } from './models/institution.model';

@Injectable()
export class InstitutionService {

  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl, private dataSource: InstitutionDataSourceService, private inquiryService: InquiryService) { }

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
