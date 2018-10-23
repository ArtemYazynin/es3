import { TestBed } from '@angular/core/testing';

import { FamilyInfoService } from './family-info.service';

describe('FamilyInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamilyInfoService = TestBed.get(FamilyInfoService);
    expect(service).toBeTruthy();
  });
});
