import { TestBed, inject } from '@angular/core/testing';

import { PrivilegeOrderService } from './privilege-order.service';

describe('PrivilegeOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivilegeOrderService]
    });
  });

  it('should be created', inject([PrivilegeOrderService], (service: PrivilegeOrderService) => {
    expect(service).toBeTruthy();
  }));
});
