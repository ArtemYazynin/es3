import { TestBed } from '@angular/core/testing';

import { SchoolInquiryInfoDataSourceService } from './school-inquiry-info-data-source.service';

describe('SchoolInquiryInfoDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolInquiryInfoDataSourceService = TestBed.get(SchoolInquiryInfoDataSourceService);
    expect(service).toBeTruthy();
  });
});
