import { TestBed, inject } from '@angular/core/testing';

import { FiasService } from './fias.service';

describe('AddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiasService]
    });
  });

  it('should be created', inject([FiasService], (service: FiasService) => {
    expect(service).toBeTruthy();
  }));
});
