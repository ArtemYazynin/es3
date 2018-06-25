import { IdentityCardChangeTemplate } from "./identity-card-change-template";
import { Validators, FormGroup, ValidatorFn } from "@angular/forms";

export class ChangeToOfficerId extends IdentityCardChangeTemplate {
    constructor(identityCardForm: FormGroup, isAvailable: any, private validationMessages: any) {
        super(identityCardForm, isAvailable);
    }

    showFormControls() {
        this.fieldSet.baseWithSeries();
    }
    setValidators() {
        this.updateValidators("series", [Validators.required, this.getSimpleCyrilicValidator(2)]);
        this.updateValidators("number", [Validators.required, this.getSimpleNumberValidator(7)]);
        this.updateValidators("issued", [Validators.required, Validators.maxLength(400)]);
        this.updateValidators("dateIssue", [Validators.required]);
    }
    setValidationMessages() {
        this.validationMessages["series"].pattern = this.validationMessage.requiredTwoCyrilicLetters;
        this.validationMessages["number"].pattern = this.validationMessage.requiredNumberOfDigits(7);
    }
}
