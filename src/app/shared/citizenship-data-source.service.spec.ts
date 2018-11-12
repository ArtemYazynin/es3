import { TestBed } from '@angular/core/testing';

import { CitizenshipDataSourceService } from './citizenship-data-source.service';

describe('CitizenshipDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitizenshipDataSourceService = TestBed.get(CitizenshipDataSourceService);
    expect(service).toBeTruthy();
  });
});
