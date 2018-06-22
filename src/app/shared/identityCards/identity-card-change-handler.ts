import { IdentityCard } from "./identityCard";
import { Validators, AbstractControl, FormControl, ValidatorFn, FormGroup } from "@angular/forms";
import { IdentityCardType } from "./identityCardType";
import { IdentityCardChangeTemplate } from "./identityCardChangeHandlers/identity-card-change-template";
import { ChangeToUndefined } from "./identityCardChangeHandlers/change-to-undefined";
import { ChangeToRfPassport } from "./identityCardChangeHandlers/change-to-rf-passport";

export class IdentityCardChangeHandler {
    private fieldSet: any;

    constructor(private identityCardForm: FormGroup, private isAvailable: any, private validationMessages: any) {
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
        }
    }

    Do(type: number): void {       
        if ((typeof type !== "number")) type = parseInt(type);
        switch (type) {
            case IdentityCardType["Другой документ, удостоверяющий личность"]:
                new ChangeToUndefined(this.identityCardForm,this.isAvailable,this.validationMessages).Do();
                break;
            case IdentityCardType["Паспорт РФ"]:
                new ChangeToRfPassport(this.identityCardForm,this.isAvailable,this.validationMessages).Do();
                break;
            case IdentityCardType["Свидетельство о рождении РФ"]:
                this.fieldSet.baseWithSeries();
                this.isAvailable.actRecordNumber = true;
                this.isAvailable.actRecordDate = true;
                this.isAvailable.actRecordPlace = true;

                this.setValidators("series", [Validators.required, Validators.pattern("^[LMCDVIX]+-[А-ЯЁ][А-ЯЁ]$")]);
                this.setValidators("number", [Validators.required, this.getSimpleNumberValidator(6)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required]);
                this.setValidators("actRecordNumber",
                    [
                        Validators.required,
                        Validators.maxLength(6),
                        Validators.minLength(6),
                        Validators.pattern("^\\d{1,6}$")
                    ]);
                this.setValidators("actRecordDate", [Validators.required]);
                this.setValidators("actRecordPlace", [Validators.required]);

                this.validationMessages["series"].pattern = "Поле должно содержать римское число, дефис, две прописные русские буквы";
                this.validationMessages["number"].pattern = "Поле должно содержать число из 6 цифр.";
                break;
            case IdentityCardType["Загранпаспорт гражданина РФ"]:
                this.fieldSet.full();
                this.setValidators("series", [Validators.required, this.getSimpleNumberValidator(2)]);
                this.setValidators("number", [Validators.required, this.getSimpleNumberValidator(7)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
                this.setValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);

                this.validationMessages["series"].pattern = "Поле должно содержать число из 2 цифр.";
                this.validationMessages["number"].pattern = "Поле должно содержать число из 7 цифр.";
                break;
            case IdentityCardType["Удостоверение офицера"]:
                this.fieldSet.baseWithSeries();
                
                this.setValidators("series", [Validators.required, this.getSimpleCyrilicValidator(2)]);
                this.setValidators("number", [Validators.required, this.getSimpleNumberValidator(7)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required]);

                this.validationMessages["series"].pattern = "Поле должно содержать две прописные русские буквы.";
                this.validationMessages["number"].pattern = "Поле должно содержать число из 7 цифр.";
                break;
            case IdentityCardType["Военный билет"]:
                this.fieldSet.baseWithSeries();

                this.setValidators("series", [Validators.required, this.getSimpleCyrilicValidator(2)]);
                this.setValidators("number", [Validators.required, this.getSimpleNumberValidator(7)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required]);

                this.validationMessages["series"].pattern = "Поле должно содержать две прописные русские буквы.";
                this.validationMessages["number"].pattern = "Поле должно содержать число из 7 цифр.";
                break;
            case IdentityCardType["Временное удостоверение, выданное взамен военного билета"]:
                this.fieldSet.baseWithDateExpired();

                this.setValidators("number", [Validators.required, this.getSimpleNumberValidator(6)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
                this.setValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);

                this.validationMessages["number"].pattern = "Поле должно содержать число из 6 цифр.";
                break;
            case IdentityCardType["Временное удостоверение личности гражданина РФ"]:
                this.fieldSet.baseWithDateExpired();

                this.setValidators("number", [Validators.required, this.getSimpleNumberValidator(6)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
                this.setValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);

                this.validationMessages["number"].pattern = "Поле должно содержать число из 6 цифр.";
                break;
            case IdentityCardType["Иностранный паспорт"]:
                this.fieldSet.base();

                this.setValidators("number", [Validators.required, Validators.maxLength(50)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required]);
                break;
            case IdentityCardType["Удостоверение личности лица без гражданства в РФ"]:
                this.fieldSet.base();

                this.setValidators("number", [Validators.required, Validators.maxLength(50)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required]);
                break;
            case IdentityCardType["Удостоверение личности отдельных категорий лиц, находящихся на территории РФ,подавших заявление о признании гражданами РФ или о приеме в гражданство РФ"]:
                this.fieldSet.baseWithDateExpired();

                this.setValidators("number", [Validators.required, Validators.maxLength(50)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
                this.setValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);

                break;
            case IdentityCardType["Удостоверение беженца"]:
                this.fieldSet.baseWithDateExpired();

                this.setValidators("number", [Validators.required, Validators.maxLength(50)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
                this.setValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);
                break;
            case IdentityCardType["Удостоверение личности лица, ходатайствующего о признании беженцем на территории РФ"]:
                this.fieldSet.baseWithDateExpired();

                this.setValidators("number", [Validators.required, Validators.maxLength(50)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
                this.setValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);
                break;
            case IdentityCardType["Удостоверение личности лица, получившего временное убежище на территории РФ"]:
                this.fieldSet.full();

                this.setValidators("series", [Validators.required, this.getSimpleCyrilicValidator(2)]);
                this.setValidators("number", [Validators.required, this.getSimpleNumberValidator(7)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
                this.setValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);

                this.validationMessages["series"].pattern = "Поле должно содержать две прописные русские буквы.";
                this.validationMessages["number"].pattern = "Поле должно содержать число из 7 цифр.";
                break;
            case IdentityCardType["Вид на жительство"]:
                this.fieldSet.full();
                this.setValidators("series", [Validators.required, this.getSimpleNumberValidator(2)]);
                this.setValidators("number", [Validators.required, this.getSimpleNumberValidator(7)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
                this.setValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);

                this.validationMessages["series"].pattern = "Поле должно содержать число из 2 цифр.";
                this.validationMessages["number"].pattern = "Поле должно содержать число из 7 цифр.";
                break;
            case IdentityCardType["Разрешение на временное проживание в РФ"]:
                this.fieldSet.baseWithDateExpired();

                this.setValidators("number", [Validators.required, Validators.pattern("^\\d{4}-\\d{4}$")]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
                this.setValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);

                this.validationMessages["number"].pattern = "Поле должно иметь формат 0000-0000";
                break;
            case IdentityCardType["Свидетельство о рассмотрении ходатайства о признании лица беженцем на территории РФ по существу"]:
                this.fieldSet.full();

                this.setValidators("series", [Validators.required, this.getSimpleCyrilicValidator(2)]);
                this.setValidators("number", [Validators.required, Validators.maxLength(50)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
                this.setValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);

                this.validationMessages["series"].pattern = "Поле должно содержать две прописные русские буквы.";
                break;
            case IdentityCardType["Свидетельство о предоставлении временного убежища на территории Российской Федерации"]:
                this.fieldSet.full();

                this.setValidators("series", [Validators.required, this.getSimpleCyrilicValidator(2)]);
                this.setValidators("number", [Validators.required, this.getSimpleNumberValidator(7)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required, <ValidatorFn>this.customValidators.dateIssue]);
                this.setValidators("dateExpired", [Validators.required, <ValidatorFn>this.customValidators.dateExpired]);

                this.validationMessages["series"].pattern = "Поле должно содержать две прописные русские буквы.";
                this.validationMessages["number"].pattern = "Поле должно содержать число из 7 цифр.";
                break;
            case IdentityCardType["Свидетельство о рождении, выданное уполномоченным органом иностранного государства"]:
                this.fieldSet.baseWithSeries();

                this.setValidators("series", [Validators.required, Validators.maxLength(10)]);
                this.setValidators("number", [Validators.required, Validators.maxLength(50)]);
                this.setValidators("issued", [Validators.required, Validators.maxLength(400)]);
                this.setValidators("dateIssue", [Validators.required]);
                break;
            default:
                throw "неизвестный тип документа";
        }
    }
    private clearValidators() {
        let fields = IdentityCard.getFields();
        for (let index = 0, len = fields.length; index < len; index++) {
            let control = this.identityCardForm.get(fields[index]);
            control.clearValidators();
            control.updateValueAndValidity();
        }
    }
    private setValidators(controlName: string, validators: Array<ValidatorFn>):void{
        const control = this.identityCardForm.get(controlName);
        control.clearValidators();
        control.setValidators(validators);
        control.updateValueAndValidity();
    }
    private getSimpleNumberValidator(occurrence: number){
        return Validators.pattern("^\\d{" + occurrence + "}$");
    }
    private getSimpleCyrilicValidator(occurrence: number){
        return Validators.pattern("^[А-ЯЁ]{" + occurrence + "}$");
    }
    

    private customValidators = (() => {
        let getErrorIfDateIssueInvalid = (dateIssue: AbstractControl, dateExpired: AbstractControl) => {
            if (!dateIssue.value || !dateExpired.value) return null;
            if (dateIssue.value > dateExpired.value) {
                return { dateIssueMoreDateExpired: dateIssue.value };
            }
        }
        let getErrorIfDateExpiredInvalid = (dateExpired: AbstractControl, dateIssue: AbstractControl) => {
            if (!dateExpired.value || !dateIssue.value) return null;
            if (dateExpired.value < dateIssue.value) {
                return { dateExpiredLessDateIssue: dateExpired.value };
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
}
