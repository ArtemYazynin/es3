import { Injectable } from '@angular/core';
import { AddressDataSourceService } from './address-data-source.service';
import { Address, AddressVm } from './models/address.model';

@Injectable()
export class AddressService {

  constructor(private dataSource: AddressDataSourceService) { }

  gets() {
    return this.dataSource.gets();
  }

  get(id: string) {
    return this.dataSource.get(id);
  }

  create(address: AddressVm) {
    return this.dataSource.post(address);
  }

  update(id: string, address: AddressVm) {
    return this.dataSource.put(id, address);
  }
}
