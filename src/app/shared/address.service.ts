import { Injectable } from '@angular/core';
import { AddressDataSourceService } from './address-data-source.service';
import { Address } from './models/address.model';

@Injectable()
export class AddressService {

  constructor(private dataSource: AddressDataSourceService) { }

  gets() {
    return this.dataSource.gets();
  }

  get(id: string) {
    return this.dataSource.get(id);
  }

  create(address: Address) {
    return this.dataSource.post(address);
  }

  update(id: string, address: Address) {
    return this.dataSource.put(id, address);
  }
}
