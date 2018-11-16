import { TestBed } from '@angular/core/testing';

import { FileAttachmentDataSourceService } from './file-attachment-data-source.service';

describe('FileAttachmentDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileAttachmentDataSourceService = TestBed.get(FileAttachmentDataSourceService);
    expect(service).toBeTruthy();
  });
});
