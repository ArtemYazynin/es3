import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { map } from 'rxjs/operators';
import { Settings } from './models/settings.model';
import { Observable } from 'rxjs';
import { SERVER_URL } from '../app.module';

@Injectable()
export class SettingsService {
  
  constructor(private http:HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  get():Observable<Settings>{
    return this.http.get(`${this.serverUrl}/settings`).pipe(map(result=>{
      return <Settings>result.json();
    }));
  }
}
