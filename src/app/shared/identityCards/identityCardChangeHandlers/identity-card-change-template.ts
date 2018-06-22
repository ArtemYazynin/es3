import { IdentityCard } from "../identityCard";
import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

export abstract class IdentityCardChangeTemplate {
    protected fieldSet:any;
    protected constructor(private identityCardForm: FormGroup, protected isAvailable: any){
        this.fieldSet = {
            base: () => {
                this.isAvailable.number = true;
                this.isAvailable.issued = true;
                this.isAvailable.dateIssue = true;
            },
            baseWithSeries: () => {
                this.fieldSet.base();
                this.isAvailable.series = true;
            },
            baseWithDateExpired: () => {
                this.fieldSet.base();
                this.isAvailable.dateExpired = true;
            },
            full: () => {
                this.fieldSet.baseWithSeries();
                this.isAvailable.dateExpired = true;
            }
        };
    }

    protected updateValidators(controlName: string, validators: Array<ValidatorFn>):void{
        const control = this.identityCardForm.get(controlName);
        control.clearValidators();
        control.setValidators(validators);
        control.updateValueAndValidity();
    };
    protected getSimpleNumberValidator(occurrence: number){
        return Validators.pattern("^\\d{" + occurrence + "}$");
    }
    protected getSimpleCyrilicValidator(occurrence: number){
        return Validators.pattern("^[А-ЯЁ]{" + occurrence + "}$");
    }

    Do():void{
        this.clearValidators();
        this.hideFormControls();

        this.showFormControls();
        this.setValidators();
        this.setValidationMessages();
    }

    private clearValidators() {
        let fields = IdentityCard.getFields();
        for (let index = 0, len = fields.length; index < len; index++) {
            let control = this.identityCardForm.get(fields[index]);
            control.clearValidators();
            control.updateValueAndValidity();
        }
    }

    private hideFormControls(){
        this.isAvailable.reset();
    }

    abstract showFormControls();
    abstract setValidators();
    abstract setValidationMessages();
}
