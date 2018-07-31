import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { HttpInterceptor } from './http-interceptor';
import { Location } from "./location";
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url = "http://api.ir-tech.ru/location?&";

  constructor(private http: HttpInterceptor) { }

  getRegions(searchStr: string): Observable<Array<Location>> {
    if (isNullOrUndefined(searchStr) || searchStr.trim() == "") searchStr = "а";

    const url = this.url + "contentType=region&limit=35&query=" + searchStr.trim();
    return this.sendRequest(url);
  }
  getCities(searchStr: string): Observable<Array<Location>> {
    if (isNullOrUndefined(searchStr) || searchStr.trim() == "") searchStr = "а";
    const url = this.url + "contentType=city&limit=35&query=" + searchStr.trim();
    return this.sendRequest(url);
  }

  private sendRequest(url: string): Observable<Array<Location>> {
    return this.http.get(url).pipe(map((response: Response) => {
      let result = <Array<Location>>response.json()["result"];
      return result;
    }));
  }
}
