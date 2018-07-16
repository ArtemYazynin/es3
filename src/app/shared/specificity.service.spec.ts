import { TestBed, inject } from '@angular/core/testing';

import { SpecificityService } from './specificity.service';

describe('SpecificityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecificityService]
    });
  });

  it('should be created', inject([SpecificityService], (service: SpecificityService) => {
    expect(service).toBeTruthy();
  }));
});
