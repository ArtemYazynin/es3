import { TestBed, inject } from '@angular/core/testing';

import { CitizenshipService } from './citizenship.service';

describe('CitizenshipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitizenshipService]
    });
  });

  it('should be created', inject([CitizenshipService], (service: CitizenshipService) => {
    expect(service).toBeTruthy();
  }));
});
