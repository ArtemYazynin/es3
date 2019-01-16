import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { DataSourceService } from './data-source.service';
import { InquiryService } from './inquiry.service';
import { SpecHealth } from './models/spec-health.model';

@Injectable()
export class SpecHealthService {
  private dataSource: DataSourceService<SpecHealth>;
  constructor(http: HttpClient, injector:Injector, private inquiryService: InquiryService) { 
    this.dataSource = new DataSourceService<SpecHealth>(http, injector, "specHealths");
  }

  gets(code?: string | number): Observable<Array<SpecHealth>> {
    const queryParams = code ? `code=${code}` : undefined;
    return this.dataSource.gets(queryParams);
  }
  get(id: string): Observable<SpecHealth> {
    return this.dataSource.get(id).pipe(map(x => new SpecHealth(x.id, x.name, x.code)));
  }

  create(specHealth: SpecHealth) {
    return this.dataSource.post(specHealth);
  }

  update(id: string, specHealth: SpecHealth) {
    return this.dataSource.put(id, specHealth);
  }

  getByInquiry(id: string): Observable<SpecHealth> {
    return this.inquiryService.get(id).pipe(map(x => x.specHealth));
  }
}
