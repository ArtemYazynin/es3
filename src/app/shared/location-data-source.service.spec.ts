import { TestBed } from '@angular/core/testing';

import { LocationDataSourceService } from './location-data-source.service';

describe('LocationDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationDataSourceService = TestBed.get(LocationDataSourceService);
    expect(service).toBeTruthy();
  });
});
