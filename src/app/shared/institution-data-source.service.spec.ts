import { TestBed } from '@angular/core/testing';

import { InstitutionDataSourceService } from './institution-data-source.service';

describe('InstitutionDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstitutionDataSourceService = TestBed.get(InstitutionDataSourceService);
    expect(service).toBeTruthy();
  });
});
