import { IdentityCardChangeTemplate } from "./identity-card-change-template";
import { Validators, FormGroup, ValidatorFn } from "@angular/forms";

export class ChangeToPermissionForTemporaryResidence extends IdentityCardChangeTemplate {
    showFormControls() {
        this.fieldSet.baseWithDateExpired();
    }
    setValidators() {
        this.updateValidators("number", [Validators.required, Validators.pattern("^\\d{4}-\\d{4}$")]);
        this.updateValidators("issued", [Validators.required, Validators.maxLength(400)]);
        this.updateValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
        this.updateValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);
    }
    setValidationMessages() {
        this.validationMessages["number"].pattern = "Поле должно иметь формат 0000-0000";
    }
    constructor(identityCardForm: FormGroup, isAvailable: any, private validationMessages: any) {
        super(identityCardForm, isAvailable);
    }
}
