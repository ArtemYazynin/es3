import { TestBed } from '@angular/core/testing';

import { FamilyInfoService } from './family-info.service';
import { Http } from '@angular/http';

describe('FamilyInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [FamilyInfoService, Http]
  }));

  it('should be created', () => {
    const service: FamilyInfoService = TestBed.get(FamilyInfoService);
    expect(service).toBeTruthy();
  });
});
