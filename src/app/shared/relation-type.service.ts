import { Injectable, Injector } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { Es3HttpClient } from './es3-http-client';
import { RelationType } from './models/relation-type.model';

@Injectable()
export class RelationTypeService {

  private dataSource: DataSourceService<RelationType>;
  constructor(http: Es3HttpClient, injector: Injector) {
    this.dataSource = new DataSourceService<RelationType>(http, injector, "relationTypes");
  }

  gets() {
    return this.dataSource.gets();
  }
}
