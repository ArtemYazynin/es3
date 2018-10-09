import { Injectable } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { Observable } from 'rxjs';
import { Specificity } from './models/specificity.model';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable()
export class SpecificityService {

  constructor(private http: HttpInterceptor) { }
  private baseUrl = "app/specificities";
  get(id?: string): Observable<Array<Specificity>> {
    const url = isNullOrUndefined(id) || id == ""
      ? this.baseUrl
      : this.baseUrl + "/?id=" + id.trim();
    return this.http.get(url).pipe(map(result => {
      return <Array<Specificity>>result.json();
    }));
  }
}
