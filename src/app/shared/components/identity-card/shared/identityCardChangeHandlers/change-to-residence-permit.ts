import { IdentityCardChangeTemplate } from "./identity-card-change-template";
import { Validators, FormGroup, ValidatorFn } from "@angular/forms";

export class ChangeToResidencePermit extends IdentityCardChangeTemplate{
    showFormControls() {
        this.fieldSet.full();
    }
    setValidators() {
        this.updateValidators("series", [Validators.required, this.getSimpleNumberValidator(2)]);
        this.updateValidators("number", [Validators.required, this.getSimpleNumberValidator(7)]);
        this.updateValidators("issued", [Validators.required, Validators.maxLength(400)]);
        this.updateValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
        this.updateValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);
    }
    setValidationMessages() {
        this.validationMessages["series"].pattern = this.validationMessage.requiredNumberOfDigits(2);
        this.validationMessages["number"].pattern = this.validationMessage.requiredNumberOfDigits(7);
    }
    constructor(identityCardForm: FormGroup, isAvailable: any, private validationMessages: any) {
        super(identityCardForm, isAvailable);
    }
}
