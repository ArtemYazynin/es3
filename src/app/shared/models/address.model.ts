import { isNullOrUndefined } from "util";
import { Location } from "./location.model";

export class Address {
    id: string;
    constructor(public region?: Location, public district?: Location, public city?: Location,
        public street?: Location, public building?: Location, public flat?: string,
        public additionalInfo?: string, public foreign?: boolean) {
    }

    static build(address: any, foreign: boolean): Address {
        if (isNullOrUndefined(address)) return undefined;
        return new Address(address.region, address.district,
            address.city, address.street,
            address.building, address.flat,
            address.additionalInfo, foreign)
    }
}

export class AddressVm {
    regionId: string;
    districtId: string;
    cityId: string;
    streetId: string;
    buildingId: string;
    flat: string;
    additionalInfo: string;
    foreign?: boolean;

    static build(region?: Location, district?: Location, city?: Location, street?: Location, building?: Location, flat?: string, additionalInfo?: string, foreign?: boolean) {
        let address = new AddressVm();
        if (region) {
          address.regionId = region.id;
          console.log(`region location created!`);
        }
        if (district) {
          address.districtId = district.id;
          console.log(`district location created!`);
        }
        if (city) {
          address.cityId = city.id;
          console.log(`city location created!`);
        }
        if (street) {
          address.streetId = street.id;
          console.log(`street location created!`);
        }
        if (building) {
          address.buildingId = building.id;
          console.log(`building location created!`);
        }
        address.flat = flat;
        address.additionalInfo = additionalInfo;
        address.foreign = foreign;
        return address;
    }
}
