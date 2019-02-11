import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../app.module';
import { DisabilityType } from './models/disability-type.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Es3HttpClient } from './es3-http-client';
import { DataSourceService } from './data-source.service';

@Injectable()
export class DisabilityService {
  private dataSource: DataSourceService<DisabilityType>;
  constructor(http: Es3HttpClient, injector:Injector) { 
    this.dataSource = new DataSourceService<DisabilityType>(http, injector, "disabilities");
  }

  gets():Observable<Array<DisabilityType>>{
    return this.dataSource.gets();
  }
}
