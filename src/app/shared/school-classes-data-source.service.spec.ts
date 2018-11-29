import { TestBed } from '@angular/core/testing';
import { SchoolClassDataSourceService } from './school-classes-data-source.service';


describe('SchoolClassesDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolClassDataSourceService = TestBed.get(SchoolClassDataSourceService);
    expect(service).toBeTruthy();
  });
});
