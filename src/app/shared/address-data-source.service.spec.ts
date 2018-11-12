import { TestBed } from '@angular/core/testing';

import { AddressDataSourceService } from './address-data-source.service';

describe('AddressDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressDataSourceService = TestBed.get(AddressDataSourceService);
    expect(service).toBeTruthy();
  });
});
