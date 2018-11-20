import { FormGroup } from "@angular/forms";
import { PetitionType } from "../petition-type.enum";
import { EditPetitionComponent } from './../../modules/inquiry/shared/components/edit-petition/edit-petition.component';
import { FamilyInfo } from "./family-info.model";
import { Person } from "./person.model";

export class Petition {
    constructor(public id: string, public dateCreate: Date, public number: string,
        public familyInfo: FamilyInfo, public comment: string, public person?: Person, public organizationName?: string) {
    }

    static cast(petition?: Petition): Petition {
        let result = this.buildEmpty();
        if (!petition) return result;

        for (const key in petition) {
            if (petition.hasOwnProperty(key)) {
                result[key] = petition[key];
            }
        }
        return result;
    }

    private static buildEmpty(): Petition {
        return new Petition(undefined, undefined, undefined, undefined, undefined, undefined);
    }

    static buildByForm(editPetitionComponent?: EditPetitionComponent, form?: FormGroup): Petition {
        if (!form) return this.buildEmpty();
        const petition = new Petition(undefined, new Date(), undefined, form.controls.familyInfo.value,
            form.controls.comment.value);
        if (form.controls.petitionType.value == PetitionType.Organization)
            petition.organizationName = form.controls.organizationName.value;
        else {
            const fio = editPetitionComponent.fullNameComponent.getResult();
            petition.person = new Person(fio.lastname, fio.firstname, fio.middlename, null, fio.noMiddlename);
            petition.person.identityCard = editPetitionComponent.identityCardComponent.getResult();
        }
        return petition;
    }
}