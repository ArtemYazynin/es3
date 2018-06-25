import { IdentityCardChangeTemplate } from "./identity-card-change-template";
import { Validators, FormGroup } from "@angular/forms";

export class ChangeToForeignPassport extends IdentityCardChangeTemplate {
    constructor(identityCardForm: FormGroup, isAvailable: any, private validationMessages: any) {
        super(identityCardForm, isAvailable);
    }
    showFormControls() {
        this.fieldSet.base();
    }
    setValidators() {
        this.updateValidators("number", [Validators.required, Validators.maxLength(50)]);
        this.updateValidators("issued", [Validators.required, Validators.maxLength(400)]);
        this.updateValidators("dateIssue", [Validators.required]);
    }
    setValidationMessages() {
    }

}
