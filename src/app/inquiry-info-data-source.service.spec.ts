import { TestBed } from '@angular/core/testing';

import { InquiryInfoDataSourceService } from './inquiry-info-data-source.service';
import { HttpInterceptor } from './shared/http-interceptor';
import { Http } from '@angular/http';
import { SERVER_URL } from './app.module';

describe('InquiryInfoDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      {provide:HttpInterceptor, useValue: Http },
      { provide: SERVER_URL, useValue: "http://localhost:3500" },
      InquiryInfoDataSourceService
    ]
  }));

  it('should be created', () => {
    const service: InquiryInfoDataSourceService = TestBed.get(InquiryInfoDataSourceService);
    expect(service).toBeTruthy();
  });
});
