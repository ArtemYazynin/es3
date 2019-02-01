import { Injectable, Injector } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { InstitutionType } from './models/Institution-type.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitutionTypeService {
  private dataSource: DataSourceService<InstitutionType>;

  constructor(http: HttpClient, private injector: Injector) {
    this.dataSource = new DataSourceService<InstitutionType>(http, injector, "institutionsTypes");
  }

  gets(){
    return this.dataSource.gets();
  }

  get(id:number){
    return this.dataSource.get(id);
  }
}
