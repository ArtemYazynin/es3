import { IdentityCardChangeTemplate } from "./identity-card-change-template";
import { Validators, FormGroup, ValidatorFn } from "@angular/forms";

export class ChangeToRefugeeId extends IdentityCardChangeTemplate {
    constructor(identityCardForm: FormGroup, isAvailable: any, private validationMessages: any) {
        super(identityCardForm, isAvailable);
    }
    showFormControls() {
        this.fieldSet.baseWithDateExpired();
    }
    setValidators() {
        this.updateValidators("number", [Validators.required, Validators.maxLength(50)]);
        this.updateValidators("issued", [Validators.required, Validators.maxLength(400)]);
        this.updateValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
        this.updateValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);
    }
    setValidationMessages() {
    }

}
