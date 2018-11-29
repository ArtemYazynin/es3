import { TestBed } from '@angular/core/testing';

import { BreadsCrumbsService } from './breads-crumbs.service';

describe('BreadsCrumbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreadsCrumbsService = TestBed.get(BreadsCrumbsService);
    expect(service).toBeTruthy();
  });
});
