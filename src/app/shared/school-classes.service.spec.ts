import { inject, TestBed } from '@angular/core/testing';
import { SchoolClassService } from './school-classes.service';

describe('SchoolClassesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolClassService]
    });
  });

  it('should be created', inject([SchoolClassService], (service: SchoolClassService) => {
    expect(service).toBeTruthy();
  }));
});
