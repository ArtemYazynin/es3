import { Representative } from "./representative";

export class Applicant {
    public hasMiddlename: boolean;
    public snils: string;
    public familyRelationship: string;
    public representative: Representative;

    constructor(){
        this.representative = new Representative();
        this.hasMiddlename = false;
    }
}
