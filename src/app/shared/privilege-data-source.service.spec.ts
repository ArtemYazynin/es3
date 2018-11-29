import { TestBed } from '@angular/core/testing';

import { PrivilegeDataSourceService } from './privilege-data-source.service';

describe('PrivilegeDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivilegeDataSourceService = TestBed.get(PrivilegeDataSourceService);
    expect(service).toBeTruthy();
  });
});
