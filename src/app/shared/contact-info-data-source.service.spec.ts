import { TestBed } from '@angular/core/testing';

import { ContactInfoDataSourceService } from './contact-info-data-source.service';

describe('ContactInfoDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactInfoDataSourceService = TestBed.get(ContactInfoDataSourceService);
    expect(service).toBeTruthy();
  });
});
