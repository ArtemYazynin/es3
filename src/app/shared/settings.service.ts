import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { Settings } from './models/settings.model';

@Injectable()
export class SettingsService {
  private _dataSource: DataSourceService<Settings>;
  constructor(http: HttpClient, injector: Injector) {
    this._dataSource = new DataSourceService<Settings>(http, injector, "settings");
  }

  gets() {
    return this._dataSource.gets();
  }
}
