import { IdentityCardChangeTemplate } from "./identity-card-change-template";
import { Validators, FormGroup, ValidatorFn } from "@angular/forms";

export class ChangeToForeignBirthCertificate extends IdentityCardChangeTemplate {
    constructor(identityCardForm: FormGroup, isAvailable: any, private validationMessages: any) {
        super(identityCardForm, isAvailable);
    }
    showFormControls() {
        this.fieldSet.baseWithSeries();
    }
    setValidators() {
        this.updateValidators("series", [Validators.required, Validators.maxLength(10)]);
        this.updateValidators("number", [Validators.required, Validators.maxLength(50)]);
        this.updateValidators("issued", [Validators.required, Validators.maxLength(400)]);
        this.updateValidators("dateIssue", [Validators.required]);
    }
    setValidationMessages() {
    }
}
