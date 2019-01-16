import { Inject, Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Petition } from '.';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PetitionDataSourceService extends DataSourceService<Petition>{

  protected api = `${this.serverUrl}/petitions`;

  constructor(protected http: HttpClient, @Inject(SERVER_URL) private serverUrl) {
    super(http);
  }
}
