import { TestBed } from '@angular/core/testing';

import { IdentityCardDataSourceService } from './identity-card-data-source.service';

describe('IdentityCardDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentityCardDataSourceService = TestBed.get(IdentityCardDataSourceService);
    expect(service).toBeTruthy();
  });
});
