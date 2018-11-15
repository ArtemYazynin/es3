import { TestBed } from '@angular/core/testing';

import { InquiryInfoService } from './inquiry-info.service';

describe('InquiryInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InquiryInfoService = TestBed.get(InquiryInfoService);
    expect(service).toBeTruthy();
  });
});
