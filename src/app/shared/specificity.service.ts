import { Injectable } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { Observable } from '../../../node_modules/rxjs';
import { Specificity } from './specificity';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpecificityService {

  constructor(private http:HttpInterceptor) { }

  get():Observable<Array<Specificity>>{
    return this.http.get("app/specificities").pipe(map(result => {
      return <Array<Specificity>>result.json();
    }));
  }
}
