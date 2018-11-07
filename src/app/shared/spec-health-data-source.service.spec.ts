import { TestBed } from '@angular/core/testing';

import { SpecHealthDataSourceService } from './spec-health-data-source.service';

describe('SpecHealthDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecHealthDataSourceService = TestBed.get(SpecHealthDataSourceService);
    expect(service).toBeTruthy();
  });
});
