import { FormGroup } from "@angular/forms";
import { IdentityCardType } from "./identityCardType";
import {
    ChangeToUndefined, ChangeToRfPassport, ChangeToBirthCertificate, ChangeToInternationalPassport, ChangeToMilitaryId, ChangeToTemporaryOfficerId,
    ChangeToOfficerId, ChangeToTemporaryId, ChangeToApplyingForRefugeeStatus, ChangeToForeignBirthCertificate, ChangeToImmigrantId,
    ChangeToForeignPassport, ChangeToObtainingCitizenshipInProgress, ChangeToReceivedTemporaryAsylum, ChangeToPermissionForTemporaryResidence,
    ChangeToRefugeeId, ChangeToCertificateOfExaminationOfAnApplicationForRecognitionRefugee, ChangeToResidencePermit, ChangeToWithoutCitizenId
} from "./identityCardChangeHandlers/index";

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
                new ChangeToUndefined(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Паспорт РФ"]:
                new ChangeToRfPassport(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Свидетельство о рождении РФ"]:
                new ChangeToBirthCertificate(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Загранпаспорт гражданина РФ"]:
                new ChangeToInternationalPassport(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Удостоверение офицера"]:
                new ChangeToOfficerId(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Военный билет"]:
                new ChangeToMilitaryId(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Временное удостоверение, выданное взамен военного билета"]:
                new ChangeToTemporaryOfficerId(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Временное удостоверение личности гражданина РФ"]:
                new ChangeToTemporaryId(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Иностранный паспорт"]:
                new ChangeToForeignPassport(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Удостоверение личности лица без гражданства в РФ"]:
                new ChangeToWithoutCitizenId(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Удостоверение личности отдельных категорий лиц, находящихся на территории РФ,подавших заявление о признании гражданами РФ или о приеме в гражданство РФ"]:
                new ChangeToObtainingCitizenshipInProgress(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Удостоверение беженца"]:
                new ChangeToRefugeeId(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Удостоверение личности лица, ходатайствующего о признании беженцем на территории РФ"]:
                new ChangeToApplyingForRefugeeStatus(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Удостоверение личности лица, получившего временное убежище на территории РФ"]:
                new ChangeToReceivedTemporaryAsylum(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Вид на жительство"]:
                new ChangeToResidencePermit(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Разрешение на временное проживание в РФ"]:
                new ChangeToPermissionForTemporaryResidence(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Свидетельство о рассмотрении ходатайства о признании лица беженцем на территории РФ по существу"]:
                new ChangeToCertificateOfExaminationOfAnApplicationForRecognitionRefugee(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Свидетельство о предоставлении временного убежища на территории Российской Федерации"]:
                new ChangeToImmigrantId(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            case IdentityCardType["Свидетельство о рождении, выданное уполномоченным органом иностранного государства"]:
                new ChangeToForeignBirthCertificate(this.identityCardForm, this.isAvailable, this.validationMessages).Do();
                break;
            default:
                throw "неизвестный тип документа";
        }
    }
}
