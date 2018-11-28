import { TestBed } from '@angular/core/testing';

import { ChildDataSourceService } from './child-data-source.service';

describe('ChildDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChildDataSourceService = TestBed.get(ChildDataSourceService);
    expect(service).toBeTruthy();
  });
});
