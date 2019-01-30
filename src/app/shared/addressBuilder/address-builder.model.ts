import { Address } from "../models/address.model";
import { Location } from "../models/location.model";
import { AbstractAddressBuilder } from "./abstract-address-builder";

export class AddressBuilder implements AbstractAddressBuilder {
    private result: string = "";
    private addInfoLabel = "Доп. информация: ";
    static defaultResult = "-"

    constructor(public address: Address) { }

    private prepare() {
        if (this.result.length > 0) this.result += ", ";
    }

    buildRegion() {
        if (this.address && this.address.region) {
            this.result = this.address.region.typeShort + "." + this.address.region.name;
        }
    }
    buildDistrict() {
        if (this.address && this.address.district && this.address.district.id) {
            this.prepare();
            this.result += this.address.district.typeShort + "." + this.address.district.name;
        }
    }
    buildCity() {
        if (this.address && this.address.city) {
            this.prepare();
            this.result += this.address.city.typeShort + "." + this.address.city.name;
        }
    }
    buildStreet() {
        if (!this.address || !this.address.street) return;
        this.prepare();
        const hasStreetObj = typeof this.address.street === "object" && (this.address.street as Location).id;
        const streetName = (this.address.street as Location).name;
        if (hasStreetObj) {
            const street = this.address.street as Location;
            this.result += street.typeShort + "." + streetName;
        } else {
            this.result += streetName;
        }
    }
    buildBuilding() {
        if (!this.address || !this.address.building || !(this.address.building as Location).name) return;
        this.prepare();
        this.result += (this.address.building as Location).name;
    }
    buildFlat() {
        if (this.address && this.address.flat && this.address.flat != "") {
            this.prepare();
            this.result += this.address.flat;
        }
    }

    buildAdditionalInfo() {
        if (this.address && this.address.additionalInfo) {
            this.prepare();
            this.result += `${this.addInfoLabel}${this.address.additionalInfo}`;
        }

    }
    getResult(): string {
        if (this.result && (typeof this.result) === "string") {
            this.result = this.result.trim();

        }
        return this.result == "" ? AddressBuilder.defaultResult : this.result;
    }
}