import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { HttpInterceptor } from './http-interceptor';
import { Location } from "./location";
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url = "http://fias.ir-tech.ru/location?&callback=JSONP_CALLBACK&limit=35&";

  constructor(private http: HttpInterceptor, private jsonp: Jsonp) { }

  getRegions(searchStr: string): Observable<Array<Location>> {
    if (this.invalid(searchStr)) return this.getDefault();
    const urlTail = this.urlBuilder({
      contentType: "region",
      query: encodeURI(searchStr.trim())
    });
    const url = this.url.concat(urlTail);
    return this.sendRequest(url);
  }
  getCities(location: Location, searchStr: string): Observable<Array<Location>> {
    if (isNullOrUndefined(location) || this.invalid(searchStr)) return this.getDefault();
    const dynamicParams = (() => {
      let result = {
        parentType: location.contentType
      };
      result[location.contentType == "district" ? "districtId" : "regionId"] = location.id
      return result;
    })();
    const params = Object.assign({}, dynamicParams, {
      parentId: location.id,
      contentType: "city",
      query: encodeURI(searchStr.trim())
    });
    const urlTail = this.urlBuilder(params);
    const url = this.url.concat(urlTail);
    return this.sendRequest(url);
  }

  getDistricts(region: Location, searchStr: string) {
    if (isNullOrUndefined(region) || this.invalid(searchStr)) return this.getDefault();
    const urlTail = this.urlBuilder({
      regionId: region.id,
      parentId: region.id,
      parentType: "region",
      contentType: "district",
      query: encodeURI(searchStr.trim())
    });
    const url = this.url.concat(urlTail);
    return this.sendRequest(url);
  }
  getStreets(city: Location, searchStr: string) {
    if (isNullOrUndefined(city) || this.invalid(searchStr)) return this.getDefault();
    const urlTail = this.urlBuilder({
      cityId: city.id,
      parentId: city.id,
      parentType: "city",
      contentType: "street",
      query: encodeURI(searchStr.trim())
    });
    const url = this.url.concat(urlTail);
    return this.sendRequest(url);
  }
  getBuildings(street: Location, searchStr: string) {
    if (isNullOrUndefined(street) || this.invalid(searchStr)) return this.getDefault();
    const urlTail = this.urlBuilder({
      streetId: street.id,
      parentId: street.id,
      parentType: "street",
      contentType: "building",
      query: encodeURI(searchStr.trim())
    });
    const url = this.url.concat(urlTail);
    return this.sendRequest(url);
  }

  private invalid(searchStr: string) {
    if ((typeof searchStr) != "string") return true;
    return isNullOrUndefined(searchStr) || searchStr.trim() == ""
  }
  private getDefault() {
    return of([]);
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
