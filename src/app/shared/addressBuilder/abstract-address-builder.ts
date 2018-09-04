export abstract class AbstractAddressBuilder {
    abstract buildRegion();
    abstract buildDistrict();
    abstract buildCity();
    abstract buildStreet();
    abstract buildBuilding();
    abstract buildFlat();
    abstract getResult(): string;
}