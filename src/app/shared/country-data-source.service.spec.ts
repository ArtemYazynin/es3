import { TestBed } from '@angular/core/testing';

import { CountryDataSourceService } from './country-data-source.service';

describe('CountryDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountryDataSourceService = TestBed.get(CountryDataSourceService);
    expect(service).toBeTruthy();
  });
});
