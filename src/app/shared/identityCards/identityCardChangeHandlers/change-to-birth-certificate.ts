import { IdentityCardChangeTemplate } from "./identity-card-change-template";
import { Validators, FormGroup } from "@angular/forms";

export class ChangeToBirthCertificate extends IdentityCardChangeTemplate {
    constructor(identityCardForm: FormGroup, isAvailable: any, private validationMessages: any) {
        super(identityCardForm, isAvailable);
    }
    showFormControls() {
        this.fieldSet.baseWithSeries();
        this.isAvailable.actRecordNumber = true;
        this.isAvailable.actRecordDate = true;
        this.isAvailable.actRecordPlace = true;
    }
    setValidators() {
        this.updateValidators("series", [Validators.required, Validators.pattern("^[LMCDVIX]+-[А-ЯЁ][А-ЯЁ]$")]);
        this.updateValidators("number", [Validators.required, this.getSimpleNumberValidator(6)]);
        this.updateValidators("issued", [Validators.required, Validators.maxLength(400)]);
        this.updateValidators("dateIssue", [Validators.required]);
        this.updateValidators("actRecordNumber",
            [
                Validators.required,
                Validators.maxLength(6),
                Validators.minLength(6),
                Validators.pattern("^\\d{1,6}$")
            ]);
        this.updateValidators("actRecordDate", [Validators.required]);
        this.updateValidators("actRecordPlace", [Validators.required]);
    }
    setValidationMessages() {
        this.validationMessages["series"].pattern = "Поле должно содержать римское число, дефис, две прописные русские буквы";
        this.validationMessages["number"].pattern = this.validationMessage.requiredNumberOfDigits(6)
    }
}

