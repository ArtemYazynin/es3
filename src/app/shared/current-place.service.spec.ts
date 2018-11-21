import { TestBed } from '@angular/core/testing';

import { CurrentEducationPlaceService } from './current-place.service';

describe('CurrentEducationPlaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentEducationPlaceService = TestBed.get(CurrentEducationPlaceService);
    expect(service).toBeTruthy();
  });
});
