import { TestBed, inject } from '@angular/core/testing';

import { ParentStepService } from './parent-step.service';

describe('ParentStepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentStepService]
    });
  });

  it('should be created', inject([ParentStepService], (service: ParentStepService) => {
    expect(service).toBeTruthy();
  }));
});
