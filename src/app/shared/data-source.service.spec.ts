import { TestBed } from '@angular/core/testing';

import { DataSourceService } from './data-source.service';

describe('InquiryDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSourceService = TestBed.get(DataSourceService);
    expect(service).toBeTruthy();
  });
});
