import { TestBed, async } from '@angular/core/testing';

import { EducProgramService } from './educ-program.service';
import { XHRBackend, BrowserXhr, ResponseOptions, Http, XSRFStrategy, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

describe('EducProgramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      // providers: [EducProgramService,HttpInterceptor, /*XHRBackend,BrowserXhr,ResponseOptions*/{provide:XHRBackend, useValue: FakeBackend }]
      providers: [EducProgramService]
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: EducProgramService = TestBed.get(EducProgramService);
    expect(service).toBeTruthy();
  });
});
