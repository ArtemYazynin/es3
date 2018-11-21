import { TestBed } from '@angular/core/testing';
import { CurrentEducationPlaceDataSourceService } from './current-place-data-source.service';


describe('CurrentEducationPlaceDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentEducationPlaceDataSourceService = TestBed.get(CurrentEducationPlaceDataSourceService);
    expect(service).toBeTruthy();
  });
});
