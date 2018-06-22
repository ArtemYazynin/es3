import { IdentityCardChangeTemplate } from "./identity-card-change-template";
import { Validators, FormGroup } from "@angular/forms";

export class ChangeToUndefined extends IdentityCardChangeTemplate{
    constructor(identityCardForm: FormGroup,  isAvailable: any, private validationMessages: any){
        super(identityCardForm,isAvailable);
    }
    showFormControls() {
        this.fieldSet.base();
        this.isAvailable.name = true;
        
    }    
    setValidators() {
        this.updateValidators("name", [Validators.required, Validators.maxLength(400)]);
        this.updateValidators("number", [Validators.required]);
        this.updateValidators("issued", [Validators.required, Validators.maxLength(400)]);
        this.updateValidators("dateIssue", [Validators.required]);
    }
    setValidationMessages() {
    }
}