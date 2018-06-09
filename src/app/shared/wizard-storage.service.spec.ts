import { TestBed, inject } from '@angular/core/testing';

import { WizardStorageService } from './wizard-storage.service';

describe('WizardStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WizardStorageService]
    });
  });

  it('should be created', inject([WizardStorageService], (service: WizardStorageService) => {
    expect(service).toBeTruthy();
  }));
});
