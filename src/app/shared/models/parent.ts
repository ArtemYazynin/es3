import { Address } from "./address";
import { Person } from "./person";
import { IdentityCard } from "./identityCard";
import { ConfirmationDocument } from "./confirmation-document";
import { RelationType } from "./relation-type";
import { PersonWithAddress } from "./person-with-address";
import { AttachmentType } from "./attachment-type.enum";
import { ApplicantType } from "../applicant-type.enum";
import { CommonService } from "../common.service";
import { FormGroup } from "@angular/forms";
import { BirthInfoComponent } from "../components/birth-info/birth-info.component";

export class Parent extends Person implements PersonWithAddress {
    identityCard: IdentityCard;

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
