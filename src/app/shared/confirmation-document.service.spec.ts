import { TestBed } from '@angular/core/testing';

import { ConfirmationDocumentService } from './confirmation-document.service';

describe('ConfirmationDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmationDocumentService = TestBed.get(ConfirmationDocumentService);
    expect(service).toBeTruthy();
  });
});
