import { Injectable } from '@angular/core';
import { LocationDataSourceService } from './location-data-source.service';
import { Location } from './models/location.model';

@Injectable()
export class LocationService {

  constructor(private dataSource: LocationDataSourceService) { }

  create(location: Location) {
    return this.dataSource.post(location)
  }

  gets() {
    return this.dataSource.gets();
  }

  get(id: string) {
    return this.dataSource.get(id);
  }

  update(id: string, location: Location) {
    return this.dataSource.put(id, location);
  }
}
