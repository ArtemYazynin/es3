import { TestBed } from '@angular/core/testing';

import { PersonDataSourceService } from './person-data-source.service';

describe('PersonDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonDataSourceService = TestBed.get(PersonDataSourceService);
    expect(service).toBeTruthy();
  });
});
