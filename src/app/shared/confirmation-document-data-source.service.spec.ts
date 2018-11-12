import { TestBed } from '@angular/core/testing';

import { ConfirmationDocumentDataSourceService } from './confirmation-document-data-source.service';

describe('ConfirmationDocumentDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmationDocumentDataSourceService = TestBed.get(ConfirmationDocumentDataSourceService);
    expect(service).toBeTruthy();
  });
});
