import { TestBed, inject } from '@angular/core/testing';

import { IdentityCardService } from './identity-card.service';

describe('IdentityCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdentityCardService]
    });
  });

  it('should be created', inject([IdentityCardService], (service: IdentityCardService) => {
    expect(service).toBeTruthy();
  }));
});
