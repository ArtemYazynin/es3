import { TestBed } from '@angular/core/testing';

import { EducProgramService } from './educ-program.service';

describe('EducProgramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EducProgramService = TestBed.get(EducProgramService);
    expect(service).toBeTruthy();
  });
});
