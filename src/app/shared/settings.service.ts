import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_URL } from '../app.module';
import { Settings } from './models/settings.model';

@Injectable()
export class SettingsService {
  
  constructor(private http:HttpClient, @Inject(SERVER_URL) private serverUrl) { }

  get():Observable<Settings>{
    return this.http.get(`${this.serverUrl}/settings`).pipe(map(result=>{
      return <Settings>result;
    }));
  }
}
