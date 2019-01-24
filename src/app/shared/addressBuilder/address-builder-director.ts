import { AbstractAddressBuilder } from "./abstract-address-builder";

export class AddressBuilderDirector {
    construct(builder: AbstractAddressBuilder) {
        if(!builder) return;
        builder.buildRegion();
        builder.buildDistrict();
        builder.buildCity();
        builder.buildStreet();
        builder.buildBuilding();
        builder.buildFlat();
        builder.buildAdditionalInfo();
    }
}