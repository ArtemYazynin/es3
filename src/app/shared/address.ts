import { Location } from "./location";
export class Address {
    constructor(public region: Location, public district: Location, public city: Location,
        public street: Location | string, public building: Location | string, public flat: string, public additionalInfo:string) {
    }
}
