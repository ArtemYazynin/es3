import { TestBed } from '@angular/core/testing';

import { SchoolInquiryInfoService } from './school-inquiry-info.service';

describe('SchoolInquiryInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolInquiryInfoService = TestBed.get(SchoolInquiryInfoService);
    expect(service).toBeTruthy();
  });
});
