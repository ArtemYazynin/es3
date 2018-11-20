import { Inject, Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Petition } from '.';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpInterceptor } from './http-interceptor';

@Injectable()
export class PetitionDataSourceService extends DataSourceService<Petition>{

  protected api = `${this.serverUrl}/petitions`;

  constructor(protected http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }

  put(id: string, entity: Petition): Observable<Petition> {
    if (!id || !entity) return empty();
    let url = `${this.api}/${id}`;
    return this.http.put(url, entity).pipe(map(response => response.json()));
  }
}
