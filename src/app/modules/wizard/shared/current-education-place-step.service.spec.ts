import { TestBed, inject } from '@angular/core/testing';

import { CurrentEducationPlaceStepService } from './current-education-place-step.service';

describe('CurrentEducationPlaceStepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentEducationPlaceStepService]
    });
  });

  it('should be created', inject([CurrentEducationPlaceStepService], (service: CurrentEducationPlaceStepService) => {
    expect(service).toBeTruthy();
  }));
});
