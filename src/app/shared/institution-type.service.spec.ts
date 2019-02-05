import { TestBed } from '@angular/core/testing';

import { InstitutionTypeService } from './institution-type.service';

describe('InstitutionTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstitutionTypeService = TestBed.get(InstitutionTypeService);
    expect(service).toBeTruthy();
  });
});
