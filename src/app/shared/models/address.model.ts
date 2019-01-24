import { isNullOrUndefined } from "util";
import { Location } from "./location.model";

export class Address {
    constructor(public region?: Location, public district?: Location, public city?: Location,
        public street?: Location | string, public building?: Location | string, public flat?: string,
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
