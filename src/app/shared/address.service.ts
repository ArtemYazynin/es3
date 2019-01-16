import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Location } from "./models/location.model";
import { locationTypes } from "./models/location-type";
@Injectable()
export class AddressService {
  private url = "http://fias.ir-tech.ru/location?&callback=JSONP_CALLBACK&limit=35&";
  constructor(private jsonp: Jsonp) { }

  getRegions(searchStr: string): Observable<Array<Location>> {
    if (this.invalid(searchStr)) return this.getDefault();
    const urlTail = this.urlBuilder({
      contentType: locationTypes.region,
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
      result[location.contentType == locationTypes.district ? "districtId" : "regionId"] = location.id
      return result;
    })();
    const params = Object.assign({}, dynamicParams, {
      parentId: location.id,
      contentType: locationTypes.city,
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
      parentType: locationTypes.region,
      contentType: locationTypes.district,
      query: encodeURI(searchStr.trim())
    });
    const url = this.url.concat(urlTail);
    return this.sendRequest(url);
  }
  getStreets(city: Location, searchStr: string) {
    if ((typeof city) != "object" || isNullOrUndefined(city) || this.invalid(searchStr)) return this.getDefault();
    const urlTail = this.urlBuilder({
      cityId: city.id,
      parentId: city.id,
      parentType: locationTypes.city,
      contentType: locationTypes.street,
      query: encodeURI(searchStr.trim())
    });
    const url = this.url.concat(urlTail);
    return this.sendRequest(url);
  }
  getBuildings(street: Location, searchStr: string) {
    if ((typeof street) != "object" || isNullOrUndefined(street) || this.invalid(searchStr)) return this.getDefault();
    const urlTail = this.urlBuilder({
      streetId: street.id,
      parentId: street.id,
      parentType: locationTypes.street,
      contentType: locationTypes.building,
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
    return this.jsonp.request(url).pipe(map(response => {
      let result = response.json()["result"];
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
