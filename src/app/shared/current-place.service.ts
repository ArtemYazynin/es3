import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSourceService } from './data-source.service';
import { CurrentEducationPlace } from './models/current-education-place.model';
import { InquiryService } from './inquiry.service';
import { Es3HttpClient } from './es3-http-client';
 
@Injectable()
export class CurrentEducationPlaceService {
  private dataSource: DataSourceService<CurrentEducationPlace>;
  constructor(http: Es3HttpClient, injector:Injector, private inquiryService: InquiryService) { 
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
