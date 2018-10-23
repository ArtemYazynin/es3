import { FormGroup } from "@angular/forms";
import { Address } from "./address.model";
import { ConfirmationDocument } from "./confirmation-document.model";
import { PersonWithAddress } from "./person-with-address.model";
import { Person } from "./person.model";
import { RelationType } from "./relation-type.model";

export class Parent extends Person implements PersonWithAddress{
    
    citizenships: Array<number>;
    countryStateDocument: ConfirmationDocument

    relationType: RelationType;
    parentRepresentChildrenDocument: ConfirmationDocument;

    register: Address;
    residential: Address;
    tempRegistrationExpiredDate: Date;
    registerAddressLikeAsResidentialAddress: boolean;

    static get systemName() {
        return "parent";
    }

    static build(form: FormGroup, birthInfoForm: FormGroup, snils: string): Parent {
        return new Parent(form.controls.lastname.value,
            form.controls.firstname.value,
            form.controls.middlename.value,
            snils,
            form.controls.noMiddlename.value,
            birthInfoForm ? birthInfoForm.controls.birthDate.value : undefined,
            birthInfoForm ? birthInfoForm.controls.birthPlace.value : undefined, 1);
    }
}
