import { TestBed, inject } from '@angular/core/testing';

import { SpecHealthService } from './spec-health.service';

describe('SpecHealthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecHealthService]
    });
  });

  it('should be created', inject([SpecHealthService], (service: SpecHealthService) => {
    expect(service).toBeTruthy();
  }));
});
