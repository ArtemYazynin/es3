import { TestBed, inject } from '@angular/core/testing';

import { RelationTypeService } from './relation-type.service';

describe('RelationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelationTypeService]
    });
  });

  it('should be created', inject([RelationTypeService], (service: RelationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
