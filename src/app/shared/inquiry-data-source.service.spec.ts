import { TestBed } from '@angular/core/testing';

import { InquiryDataSourceService } from './inquiry-data-source.service';

describe('InquiryDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InquiryDataSourceService = TestBed.get(InquiryDataSourceService);
    expect(service).toBeTruthy();
  });
});
