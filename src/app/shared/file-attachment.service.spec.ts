import { TestBed } from '@angular/core/testing';

import { FileAttachmentService } from './file-attachment.service';

describe('FileAttachmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileAttachmentService = TestBed.get(FileAttachmentService);
    expect(service).toBeTruthy();
  });
});
