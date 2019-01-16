import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentEducationPlace, InquiryService } from '.';
import { DataSourceService } from './data-source.service';
 
@Injectable()
export class CurrentEducationPlaceService {
  private dataSource: DataSourceService<CurrentEducationPlace>;
  constructor(http: HttpClient, injector:Injector, private inquiryService: InquiryService) { 
    this.dataSource = new DataSourceService<CurrentEducationPlace>(http, injector, "currentEducationPlaces");
  }

  gets(): Observable<Array<CurrentEducationPlace>> {
    return this.dataSource.gets();
  }
  get(id: string): Observable<CurrentEducationPlace> {
    return this.dataSource.get(id).pipe(map(x => CurrentEducationPlace.cast(x)));
  }

  create(currentEducationPlace: CurrentEducationPlace): Observable<CurrentEducationPlace> {
    return this.dataSource.post(currentEducationPlace);
  }

  update(id: string, currentEducationPlace: CurrentEducationPlace): Observable<CurrentEducationPlace> {
    return this.dataSource.put(id, currentEducationPlace);
  }

  getByInquiry(id: string): Observable<CurrentEducationPlace> {
    return this.inquiryService.get(id).pipe(map(x => CurrentEducationPlace.cast(x.currentEducationPlace)));
  }
}
