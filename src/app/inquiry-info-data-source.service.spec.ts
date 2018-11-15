import { TestBed } from '@angular/core/testing';

import { InquiryInfoDataSourceService } from './inquiry-info-data-source.service';

describe('InquiryInfoDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InquiryInfoDataSourceService = TestBed.get(InquiryInfoDataSourceService);
    expect(service).toBeTruthy();
  });
});
