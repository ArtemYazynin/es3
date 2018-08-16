import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { HttpInterceptor } from './http-interceptor';
import { Location } from "./location";
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Jsonp } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url = "http://fias.ir-tech.ru/location?&callback=JSONP_CALLBACK&limit=35&";

  constructor(private http: HttpInterceptor, private jsonp: Jsonp) { }

  getRegions(searchStr: string): Observable<Array<Location>> {
    if (isNullOrUndefined(searchStr) || searchStr.trim() == "") return of([]);
    const urlTail = this.urlBuilder({
      contentType: "region",
      query: encodeURI(searchStr.trim()) 
    });
    const url = this.url.concat(urlTail);
    return this.sendRequest(url);
  }
  getCities(regionId: string, searchStr: string): Observable<Array<Location>> {
    if (isNullOrUndefined(searchStr) || searchStr.trim() == "") return of([]);
    const urlTail = this.urlBuilder({
      regionId: regionId,
      parentId: regionId,
      parentType: "region",
      contentType: "city",
      query: encodeURI(searchStr.trim()) 
    });
    const url = this.url.concat(urlTail);
    return this.sendRequest(url);
  }

  private sendRequest(url: string): Observable<Array<Location>> {
    return this.jsonp.request(url).pipe(map((response: Response) => {
      let result = <Array<Location>>response.json()["result"];
      return result;
    }));
  }

  private urlBuilder(param: object) {
    if (isNullOrUndefined(param) || Object.keys(param).length == 0) return "";
    let result = "";
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const value = param[key];
        result = result.concat(key + "=" + value + "&");
      }
    }
    return result;
  }
}
