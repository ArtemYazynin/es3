import { TestBed } from '@angular/core/testing';

import { DisabilityService } from './disability.service';

describe('DisabilityTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisabilityService = TestBed.get(DisabilityService);
    expect(service).toBeTruthy();
  });
});
