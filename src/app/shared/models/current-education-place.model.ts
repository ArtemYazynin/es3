import { FormGroup } from "@angular/forms";
import { Group } from "./group.model";

export class CurrentEducationPlace {
    id: string;
    municipality: string;
    institutionType: number;
    institution: string;
    group: Group;
    other: string;
    isOther: boolean;

    constructor(municipality: string, institutionType: number, institution: string, isOther: boolean, other?: string, group?: Group) {
        this.municipality = municipality;
        this.institutionType = institutionType;
        this.institution = institution;
        this.group = group;
        this.isOther = isOther;
        this.other = other;
    }

    static buildByForm(form?: FormGroup, groups?: Group[]): CurrentEducationPlace {
        if (!form) return;
        if (form.controls.isOther.value) {
            return CurrentEducationPlace.getOther(form.controls.other ? form.controls.other.value : undefined)
        } else {
            const group = groups ? groups.find(group => group.id == form.controls.group.value) : undefined;
            return new CurrentEducationPlace(form.controls.municipality.value, form.controls.institutionType.value, form.controls.institution.value, false, undefined, group);
        }

    }

    static cast(currentEducationPlace?: CurrentEducationPlace): CurrentEducationPlace {
        let result = this.buildEmpty();
        if (!currentEducationPlace) return result;

        for (const key in currentEducationPlace) {
            if (currentEducationPlace.hasOwnProperty(key)) {
                result[key] = currentEducationPlace[key];
            }
        }
        return result;
    }

    static getFormErrors(): any {
        return {
            municipality: "",
            institutionType: "",
            institution: "",
            other: ""
        };
    }
    static getValidationMessages(): any {
        let required = { "required": "Обязательное поле." };
        return {
            municipality: required,
            institutionType: required,
            institution: required,
            other: Object.assign({}, required, { maxlength: "Значение не должно быть больше 250 символов." })
        };
    }

    private static buildEmpty(): CurrentEducationPlace {
        return new CurrentEducationPlace(undefined, undefined, undefined, false, undefined);
    }

    private static getOther(customName) {
        if(!customName) return;
        const place = CurrentEducationPlace.buildEmpty();
        place.isOther = true;
        place.other = customName;
        return place;
    }
}
