import { TestBed, async } from '@angular/core/testing';

import { DataSourceService } from './data-source.service';
import { Inquiry } from './models/inquiry.model';

describe('InquiryDataSourceService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers:[DataSourceService]
    })
      .compileComponents();
  }));
  

  it('should be created', () => {
    const service: DataSourceService<Inquiry> = TestBed.get(DataSourceService);
    expect(service).toBeTruthy();
  });
});
