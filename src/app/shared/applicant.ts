import { Representative } from "./representative";

export class Applicant {
    public hasMiddlename: boolean;
    public snils: string;
    public familyRelationship: string;
    public representative: Representative;
    public agree: boolean;

    constructor(){
        this.representative = new Representative();
        this.hasMiddlename = false;
        this.agree = false;
    }
}
