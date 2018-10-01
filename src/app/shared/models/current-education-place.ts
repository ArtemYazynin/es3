import { Group } from "./group";

export class CurrentEducationPlace {
    municipality: string;
    institutionType: number;
    institution: string;
    group: Group;
    other: string;
    isOther: boolean;

    constructor(municipality: string, institutionType: number, institution: string, isOther: boolean, other: string, group?: Group) {
        this.municipality = municipality;
        this.institutionType = institutionType;
        this.institution = institution;
        this.group = group;
        this.isOther = isOther;
        this.other = other;
    }
}
