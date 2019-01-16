import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InquiryService, Petition } from '.';
import { DataSourceService } from './data-source.service';
import { Guid } from './models/guid';

@Injectable()
export class PetitionService {
  private dataSource: DataSourceService<Petition>;
  constructor(http: HttpClient, injector:Injector, private inquiryService: InquiryService) { 
    this.dataSource = new DataSourceService<Petition>(http, injector, "petitions");
  }

  gets(): Observable<Array<Petition>> {
    return this.dataSource.gets();
  }
  get(id: string): Observable<Petition> {
    return this.dataSource.get(id).pipe(map(x => Petition.cast(x)));
  }

  create(petition: Petition): Observable<Petition> {
    petition.id = Guid.newGuid();
    petition.number = Guid.newGuid();
    if (petition.person) {
      petition.person.id = Guid.newGuid();
    }
    return this.dataSource.post(petition);
  }

  update(id: string, petition: Petition): Observable<Petition> {
    return this.dataSource.put(id, petition);
  }

  getByInquiry(id: string): Observable<Petition> {
    return this.inquiryService.get(id).pipe(map(x => Petition.cast(x.petition)));
  }
}