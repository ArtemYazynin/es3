import { IdentityCardChangeTemplate } from "./identity-card-change-template";
import { Validators, FormGroup } from "@angular/forms";

export class ChangeToRfPassport extends IdentityCardChangeTemplate{
    constructor(identityCardForm: FormGroup,  isAvailable: any, private validationMessages: any){
        super(identityCardForm,isAvailable);
    }
    showFormControls() {
        this.isAvailable.issueDepartmentCode = true;
        this.fieldSet.baseWithSeries();
    }    
    setValidators() {
        this.updateValidators("series", [Validators.required, this.getSimpleNumberValidator(4)]);
        this.updateValidators("number", [Validators.required, this.getSimpleNumberValidator(6)]);
        this.updateValidators("issued", [Validators.required, Validators.maxLength(400)]);
        this.updateValidators("dateIssue", [Validators.required]);
        this.updateValidators("issueDepartmentCode", [Validators.required, Validators.pattern("^\\d{3}-\\d{3}$")]);
    }
    setValidationMessages() {
        this.validationMessages["series"].pattern = "Поле должно содержать число из 4 цифр.";
        this.validationMessages["number"].pattern = "Поле должно содержать число из 6 цифр.";
    }

}
