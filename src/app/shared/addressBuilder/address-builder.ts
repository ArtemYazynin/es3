import { Address } from "../address";
import { Location } from "../location";
import { AbstractAddressBuilder } from "./abstract-address-builder";

export class AddressBuilder implements AbstractAddressBuilder {
    
    private result: string;

    constructor(public address: Address) {

    }
    buildRegion() {
        this.result = this.address.region.typeShort + "." + this.address.region.name;
    }
    buildDistrict() {
        if (this.address.district) {
            this.result += ", " + this.address.district.typeShort + "." + this.address.district.name;
        }
    }
    buildCity() {
        if (this.address.city) {
            this.result += ", " + this.address.city.typeShort + "." + this.address.city.name;
        }
    }
    buildStreet() {
        if (this.address.street) {
            this.result += ", ";
            if ((typeof this.address.street) == "object") {
                const street = this.address.street as Location;
                this.result += street.typeShort + "." + street.name;
            } else {
                this.result += this.address.street;
            }
        }
    }
    buildBuilding() {
        if (this.address.building) {
            this.result += ", ";
            if ((typeof this.address.building) == "object") {
                const building = this.address.building as Location;
                this.result += building.name;
            } else {
                this.result += this.address.building;
            }
        }
    }
    buildFlat() {
        if (this.address.flat) this.result += ", " + this.address.flat;
    }

    buildAdditionalInfo() {
        if(!this.address.additionalInfo) return;
        this.result += ". Доп. информация: " + this.address.additionalInfo
    }
    getResult(): string {
        return this.result;
    }
}