import { AbstractAddressBuilder } from './abstract-address-builder';
import { AddressBuilderDirector } from "./address-builder-director";

describe("AddressBuilderDirector", () => {
    it("construct. Should call builder methods.", () => {
        const director = new AddressBuilderDirector();
        director.construct(undefined);
        expect(director.construct).not.toThrow();
        expect(director.construct).not.toThrowError();
    });
    it("construct. Should call builder methods.", () => {
        const builder: AbstractAddressBuilder = jasmine.createSpyObj("builder", ["buildRegion", "buildDistrict", "buildCity", "buildStreet", "buildBuilding", "buildFlat", "buildAdditionalInfo",])
        const director = new AddressBuilderDirector();
        director.construct(builder);
        expect(builder.buildRegion).toHaveBeenCalled();
        expect(builder.buildDistrict).toHaveBeenCalled();
        expect(builder.buildCity).toHaveBeenCalled();
        expect(builder.buildStreet).toHaveBeenCalled();
        expect(builder.buildBuilding).toHaveBeenCalled();
        expect(builder.buildFlat).toHaveBeenCalled();
        expect(builder.buildAdditionalInfo).toHaveBeenCalled();
    });
});