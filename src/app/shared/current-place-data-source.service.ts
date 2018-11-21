import { Inject, Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentEducationPlace } from '.';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpInterceptor } from './http-interceptor';

@Injectable()
export class CurrentEducationPlaceDataSourceService extends DataSourceService<CurrentEducationPlace>{

  protected api = `${this.serverUrl}/currentEducationPlaces`;

  constructor(protected http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }

  put(id: string, entity: CurrentEducationPlace): Observable<CurrentEducationPlace> {
    if (!id || !entity) return empty();
    let url = `${this.api}/${id}`;
    return this.http.put(url, entity).pipe(map(response => response.json()));
  }
}
