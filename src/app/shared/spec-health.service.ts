import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { SpecHealth } from './models/spec-health.model';
import { SpecHealthDataSourceService } from './spec-health-data-source.service';

@Injectable()
export class SpecHealthService {
  constructor(private dataSource: SpecHealthDataSourceService) { }

  gets(code?: string | number): Observable<Array<SpecHealth>> {
    const queryParams = code ? `code=${code}` : undefined;
    return this.dataSource.gets(queryParams);
  }
  get(id: string): Observable<SpecHealth> {
    return this.dataSource.get(id).pipe(map(x => new SpecHealth(x.id, x.name, x.code)));
  }
}
