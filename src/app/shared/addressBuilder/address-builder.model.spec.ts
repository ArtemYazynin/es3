import { AddressBuilder } from './address-builder.model';
import { Address } from '../models/address.model';
import { Location } from "../models/location.model";


describe("AddressBuilderDirector", () => {
    const region = (() => {
        const location = new Location();
        location.typeShort = "обл";
        location.name = "Самарская";
        return location;
    })();

    const district = (() => {
        const location = new Location();
        location.id = "82";
        location.typeShort = "р-н";
        location.name = "Октябрьский";
        return location;
    })();
    const city = (() => {
        const location = new Location();
        location.typeShort = "г";
        location.name = "Самара";
        return location;
    })();
    const street = (() => {
        const location = new Location();
        location.id = "25";
        location.typeShort = "ул";
        location.name = "Николая-Панова";
        return location;
    })();
    const building = (() => {
        const location = new Location();
        location.id = "34";
        location.name = "31";
        return location;
    })();
    const flat = "209";
    const additionalInfo = "курьер позвонит, я спущусь ахахах";
    it("Address is undefined. Should result equal string.empty", () => {
        const builder = new AddressBuilder(undefined);
        builder.buildRegion();
        builder.buildDistrict();
        builder.buildCity();
        builder.buildStreet();
        builder.buildBuilding();
        builder.buildFlat();
        builder.buildAdditionalInfo();
        const result = builder.getResult();
        expect(result).toBe(AddressBuilder.defaultResult);
    });
    it("buildRegion Should valid result", () => {
        const address = new Address(region);
        const builder = new AddressBuilder(address);
        builder.buildRegion();
        expect(builder.getResult()).toEqual(`${region.typeShort}.${region.name}`);
    });
    it("buildDistrict, Should valid result", () => {
        const address = new Address(undefined, district);
        const builder = new AddressBuilder(address);
        builder.buildDistrict();
        expect(builder.getResult()).toEqual(`${district.typeShort}.${district.name}`);
    });

    it("buildCity, Should valid result", () => {
        const address = new Address(undefined, undefined, city);
        const builder = new AddressBuilder(address);
        builder.buildCity();
        expect(builder.getResult()).toEqual(`${city.typeShort}.${city.name}`);
    });

    it("buildStreet(object). Should valid result", () => {
        const address = new Address(undefined, undefined, undefined, street);
        const builder = new AddressBuilder(address);
        builder.buildStreet();
        expect(builder.getResult()).toEqual(`${street.typeShort}.${street.name}`);
    });

    it("buildStreet(string). Should valid result", () => {
        const customStreet = "customStreet";
        const address = new Address(undefined, undefined, undefined, customStreet);
        const builder = new AddressBuilder(address);
        builder.buildStreet();
        expect(builder.getResult()).toEqual(customStreet);
    });

    it("buildBuilding(object). Should valid result", () => {
        const address = new Address(undefined, undefined, undefined, undefined, building);
        const builder = new AddressBuilder(address);
        builder.buildBuilding();
        expect(builder.getResult()).toEqual(building.name);
    });

    it("buildBuilding(string). Should valid result", () => {
        const customBuilding = "customStreet";
        const address = new Address(undefined, undefined, undefined, undefined, customBuilding);
        const builder = new AddressBuilder(address);
        builder.buildBuilding();
        expect(builder.getResult()).toEqual(customBuilding);
    });

    it("buildFlat, Should valid result", () => {
        const flat = "22";
        const address = new Address(undefined, undefined, undefined, undefined, undefined, flat);
        const builder = new AddressBuilder(address);
        builder.buildFlat();
        expect(builder.getResult()).toEqual(flat);
    });

    it("buildAdditionalInfo, Should valid result", () => {
        const additionalInfo = "additionalInfo";
        const address = new Address(undefined, undefined, undefined, undefined, undefined, undefined, additionalInfo);
        const builder = new AddressBuilder(address);
        builder.buildAdditionalInfo();
        expect(builder.getResult()).toEqual(`${builder["addInfoLabel"]}${additionalInfo}`);
    });
    it("Complete building of address", () => {
        const address = new Address(region, district, city, street, building, flat, additionalInfo, true);
        const builder = new AddressBuilder(address);
        builder.buildRegion();
        builder.buildDistrict();
        builder.buildCity();
        builder.buildStreet();
        builder.buildBuilding();
        builder.buildFlat();
        builder.buildAdditionalInfo();
        const fact = `${region.typeShort}.${region.name}, ${district.typeShort}.${district.name}, ${city.typeShort}.${city.name}, ${street.typeShort}.${street.name}, ${building.name}, ${flat}, ${builder["addInfoLabel"]}${additionalInfo}`;
        expect(builder.getResult()).toEqual(fact);
    });
});