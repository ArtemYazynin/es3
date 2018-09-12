import { IdentityCard } from "../../../../models/identityCard";
import { FormGroup, ValidatorFn, Validators, FormControl, AbstractControl } from "@angular/forms";
import { IValidationMessage } from "./IValidationMessage";
import { ValidationMessage } from "./ValidationMessage";


export abstract class IdentityCardChangeTemplate {
    protected fieldSet: any;
    protected validationMessage: IValidationMessage = new ValidationMessage();

    protected constructor(private identityCardForm: FormGroup, protected isAvailable: any) {
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

    protected updateValidators(controlName: string, validators: Array<ValidatorFn>): void {
        const control = this.identityCardForm.get(controlName);
        control.clearValidators();
        control.setValidators(validators);
        control.updateValueAndValidity();
    };
    protected getSimpleNumberValidator(occurrence: number) {
        return Validators.pattern("^\\d{" + occurrence + "}$");
    }
    protected getSimpleCyrilicValidator(occurrence: number) {
        return Validators.pattern("^[А-ЯЁ]{" + occurrence + "}$");
    }

    protected customValidators = (() => {
        let getErrorIfDateIssueInvalid = (dateIssue: AbstractControl, dateExpired: AbstractControl) => {
            if (!dateIssue.value || !dateExpired.value) return null;
            if (dateIssue.value.jsdate > dateExpired.value.jsdate) {
                return { dateIssueMoreDateExpired: dateIssue.value.jsdate };
            }
        }
        let getErrorIfDateExpiredInvalid = (dateExpired: AbstractControl, dateIssue: AbstractControl) => {
            if (!dateExpired.value || !dateIssue.value) return null;
            if (dateExpired.value.jsdate < dateIssue.value.jsdate) {
                return { dateExpiredLessDateIssue: dateExpired.value.jsdate };
            }
        }
        return {
            dateIssue: (control: FormControl) => {
                let dateExpired = this.identityCardForm.get("dateExpired");
                let error = getErrorIfDateIssueInvalid(control, dateExpired);
                if (error) return error;

                let actualDateExpiredError = getErrorIfDateExpiredInvalid(dateExpired, control);

                if (dateExpired.errors && dateExpired.errors["dateExpiredLessDateIssue"] && !actualDateExpiredError) {
                    delete dateExpired.errors["dateExpiredLessDateIssue"];
                    dateExpired.updateValueAndValidity();
                }

                return null;
            },
            dateExpired: (control: FormControl) => {
                let dateIssue = this.identityCardForm.get("dateIssue");
                let error = getErrorIfDateExpiredInvalid(control, dateIssue);
                if (error) return error;

                let actualDateIssueError = getErrorIfDateIssueInvalid(dateIssue, control);
                if (dateIssue.errors && dateIssue.errors["dateIssueMoreDateExpired"] && !actualDateIssueError) {
                    delete dateIssue.errors["dateIssueMoreDateExpired"];
                    dateIssue.updateValueAndValidity();
                }

                return null;
            }
        }
    })()

    Do(): void {
        this.prepareForm();
        this.hideFormControls();

        this.showFormControls();
        this.setValidators();
        this.setValidationMessages();
    }

    private prepareForm() {
        let fields = IdentityCard.getFields();
        for (let index = 0, len = fields.length; index < len; index++) {
            let control = this.identityCardForm.get(fields[index]);
            control.clearValidators();
            control.setValue("");
            control.markAsPristine();
            control.updateValueAndValidity();
        }
    }

    private hideFormControls() {
        this.isAvailable.reset();
    }

    abstract showFormControls();
    abstract setValidators();
    abstract setValidationMessages();
}
