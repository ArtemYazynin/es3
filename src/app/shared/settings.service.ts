import { Injectable } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { map } from 'rxjs/operators';
import { Settings } from './models/settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  constructor(private http:HttpInterceptor) { }

  get():Observable<Settings>{
    return this.http.get("app/settings").pipe(map(result=>{
      return <Settings>result.json();
    }));
  }
}
