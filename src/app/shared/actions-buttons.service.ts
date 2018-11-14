import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, timer } from 'rxjs';
import { InquiryService, inquiryType, DublicatesFinder, Parent, Child, SpecHealth } from '.';
import { EditContactInfoDialogComponent } from '../modules/inquiry/edit-contact-info-dialog/edit-contact-info-dialog.component';
import { EditCurrentEducationPlaceDialogComponent } from '../modules/inquiry/edit-current-education-place-dialog/edit-current-education-place-dialog.component';
import { EditFileAttachmentsDialogComponent } from '../modules/inquiry/edit-file-attachments-dialog/edit-file-attachments-dialog.component';
import { EditInquiryInfoDialogComponent } from '../modules/inquiry/edit-inquiry-info-dialog/edit-inquiry-info-dialog.component';
import { EditPersonDialogComponent } from '../modules/inquiry/edit-person-dialog/edit-person-dialog.component';
import { EditPreschoolInstitutionDialogComponent } from '../modules/inquiry/edit-preschool-institution-dialog/edit-preschool-institution-dialog.component';
import { EditPrivilegeDialogComponent } from '../modules/inquiry/edit-privilege-dialog/edit-privilege-dialog.component';
import { EditSchoolInquiryInfoDialogComponent } from '../modules/inquiry/edit-school-inquiry-info-dialog/edit-school-inquiry-info-dialog.component';
import { EditChildrenComponent } from '../modules/inquiry/shared/components/edit-children/edit-children.component';
import { EditContactInfoComponent } from '../modules/inquiry/shared/components/edit-contact-info/edit-contact-info.component';
import { EditCurrentEducationPlaceComponent } from '../modules/inquiry/shared/components/edit-current-education-place/edit-current-education-place.component';
import { EditFileAttachmentsComponent } from '../modules/inquiry/shared/components/edit-file-attachments/edit-file-attachments.component';
import { EditInquiryInfoComponent } from '../modules/inquiry/shared/components/edit-inquiry-info/edit-inquiry-info.component';
import { EditInstitutionsComponent } from '../modules/inquiry/shared/components/edit-institutions/edit-institutions.component';
import { EditPersonComponent } from '../modules/inquiry/shared/components/edit-person/edit-person.component';
import { CurrentEducationPlace, WizardStorageService } from '../modules/wizard/shared';
import { ApplicantType } from './applicant-type.enum';
import { EditSchoolInquiryInfoComponent } from './components/edit-school-inquiry-info/edit-school-inquiry-info.component';
import { PrivilegeEditComponent } from './components/privilege-edit/privilege-edit.component';
import { Inquiry } from './models/inquiry.model';
import { EditCitizenshipsComponent } from '../modules/inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { RelationTypeComponent } from './components/relation-type/relation-type.component';
import { Privilege } from './models/privilege.model';

@Injectable()
export class ActionsButtonsService {
    constructor(private storageService: WizardStorageService, private inquiryService: InquiryService, private router: Router, private route: ActivatedRoute) { }

    primaryActionChildrenStep(editChildrenComponent: EditChildrenComponent, inquiryType: any) {
        return () => {
            this.inquiryService.saveChildren(editChildrenComponent, (patch: { children:Array<Child>, specHealth:SpecHealth }) => {
                this.storageService.set(inquiryType, patch);
            })
            this.router.navigate(["../currentEducationPlaceStep"], { relativeTo: this.route });
        }
    }
    inverseActionChildrenStep() {
        return () => {
            this.router.navigate(["/"]);
        }
    }

    primaryActionApplicantTypeStep(inquiry: Inquiry, applicantType: ApplicantType, route: ActivatedRoute) {
        Object.assign(inquiry, { applicantType: applicantType });
        const clearAddressInfo = () => {
            if (inquiry.parent) {
                inquiry.parent.register = undefined;
                inquiry.parent.residential = undefined;
                inquiry.parent.tempRegistrationExpiredDate = undefined;
                inquiry.parent.registerAddressLikeAsResidentialAddress = undefined;
            }
        }
        switch (applicantType) {
            case ApplicantType.Applicant:
                clearAddressInfo();
                this.storageService.set(inquiry.type, inquiry)
                this.router.navigate(["../applicantStep"], { relativeTo: route });
                break;
            case ApplicantType.Parent:
                inquiry.applicant = undefined;
                this.storageService.set(inquiry.type, inquiry)
                this.router.navigate(["../parentStep"], { relativeTo: route });
                break;
            case ApplicantType.Child:
                inquiry.applicant = undefined;
                inquiry.parent = undefined;
                this.storageService.set(inquiry.type, inquiry);
                this.router.navigate(["../contactInfoStep"], { relativeTo: route });
            default:
                break;
        }
    }

    primaryActionParentStep(editCitizenshipsComponent: EditCitizenshipsComponent, editPersonComponent: EditPersonComponent, relationTypeComponent: RelationTypeComponent, inquiry: Inquiry) {
        return () => {
            const fullnameResult = editPersonComponent.fullnameComponent.getResult();
            const parent = new Parent(fullnameResult.lastname, fullnameResult.firstname, fullnameResult.middlename, editPersonComponent.snilsComponent.snils,
                fullnameResult.noMiddlename, undefined, undefined, undefined);
            parent.identityCard = editPersonComponent.identityCardComponent.getResult();

            const citizenshipsWithAddresses = editCitizenshipsComponent.getResult();
            parent.countryStateDocument = citizenshipsWithAddresses.document;
            parent.citizenships = citizenshipsWithAddresses.citizenships;
            parent.relationType = relationTypeComponent.owner.relationType;
            parent.parentRepresentChildrenDocument = relationTypeComponent.editConfirmationDocumentComponent
                ? relationTypeComponent.editConfirmationDocumentComponent.getResult()
                : undefined;
            Object.assign(parent, citizenshipsWithAddresses.addresses);
            if (inquiry.applicantType == ApplicantType.Parent && DublicatesFinder.betweenParentChildren(parent, inquiry.children)) {
                return;
            } else if (inquiry.applicantType == ApplicantType.Applicant
                && (DublicatesFinder.betweenApplicantParent(inquiry.applicant, parent)
                    || DublicatesFinder.betweenApplicantChildren(inquiry.applicant, inquiry.children)
                    || DublicatesFinder.betweenParentChildren(parent, inquiry.children))) {
                return;
            }
            if (inquiry.parent) {
                Object.assign(inquiry.parent, parent);
            } else {
                inquiry.parent = parent;
            }

            this.storageService.set(inquiry.type, inquiry);
            this.router.navigate(["../contactInfoStep"], { relativeTo: this.route });
        }
    }
    inverseActionParentStep(applicantType: ApplicantType) {
        return () => {
            if (applicantType == ApplicantType.Applicant) {
                this.router.navigate(["../applicantStep"], { relativeTo: this.route });
            } else {
                this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
            }
        }
    }

    primaryActionCurrentEducationPlaceStep(editCurrentEducationPlaceComponent: EditCurrentEducationPlaceComponent, inquiryType: any, router: Router, route: ActivatedRoute) {
        return () => {
            const place = new CurrentEducationPlace(editCurrentEducationPlaceComponent.currentPlaceForm.value["municipality"],
                editCurrentEducationPlaceComponent.currentPlaceForm.value["institutionType"], editCurrentEducationPlaceComponent.currentPlaceForm.value["institution"],
                editCurrentEducationPlaceComponent.currentPlaceForm.value["isOther"], editCurrentEducationPlaceComponent.currentPlaceForm.value["other"],
                editCurrentEducationPlaceComponent.groups.find(group => group.id == editCurrentEducationPlaceComponent.currentPlaceForm.value["group"]));
            this.storageService.set(inquiryType, { currentEducationPlace: place });
            router.navigate(["../applicantTypeStep"], { relativeTo: route });
        }
    }
    inverseActionCurrentEducationPlaceStep(router: Router, route: ActivatedRoute) {
        return () => {
            router.navigate(["../childrenStep"], { relativeTo: route });
        }
    }

    primaryActionContactInfoStep(editContactInfoComponent: EditContactInfoComponent, inquiryType: any, router: Router, route: ActivatedRoute) {
        return () => {
            this.inquiryService.saveContactInfo(editContactInfoComponent, (patch) => {
                this.storageService.set(inquiryType, patch);
            })
            if (inquiryType == inquiryType.healthCamp) {
                router.navigate(["../jobInfoStep"], { relativeTo: route });
            } else {
                router.navigate(["../privilegeStep"], { relativeTo: route });
            }
        }
    }
    inverseActionContactInfoStep(router: Router, route: ActivatedRoute) {
        return () => {
            router.navigate(["../parentStep"], { relativeTo: route });
        }
    }

    primaryActionPrivilegeStep(privilegeEditComponent: PrivilegeEditComponent, inquiry: Inquiry, route: ActivatedRoute) {
        return () => {
            this.inquiryService.savePrivilege(privilegeEditComponent, (patch) => {
                this.storageService.set(inquiry.type, patch);
            });
            switch (inquiry.type) {
                case inquiryType.profEducation:
                    this.router.navigate(["../educDocumentInfoStep"], { relativeTo: route });
                    break;
                case inquiryType.preschool:
                this.router.navigate(["../inquiryInfoStep"], { relativeTo: route });
                    break;
                case inquiryType.school:
                this.router.navigate(["../schoolInquiryInfoStep"], { relativeTo: route });
                    break;
                default:
                    break;
            }
        }
    }
    inverseActionPrivilegeStep(inquiryType: any, router: Router, route: ActivatedRoute) {
        return () => {
            if (inquiryType == inquiryType.healthCamp) {
                router.navigate(["../jobInfoStep"], { relativeTo: route });
            } else {
                router.navigate(["../contactInfoStep"], { relativeTo: route });
            }
        }
    }

    primaryActionInquiryInfoStep(editInquiryInfoComponent: EditInquiryInfoComponent, inquiryType: any, router: Router, route: ActivatedRoute) {
        return () => {
            this.inquiryService.saveInquiryInfo(editInquiryInfoComponent, (patch) => {
                this.storageService.set(inquiryType, patch);
            })
            router.navigate(["../preschoolInstitutionStep"], { relativeTo: route });
        }
    }
    inverseActionInquiryInfoStep(inquiryCurrentType: any, router: Router, route: ActivatedRoute) {
        return () => {
            if (inquiryCurrentType == inquiryType.profEducation) {
                router.navigate(["../marksStep"], { relativeTo: route });
            } else {
                router.navigate(["../privilegeStep"], { relativeTo: route });
            }
        }
    }

    primaryActionInsitutionStep(editInstitutionsComponent: EditInstitutionsComponent, inquiry: Inquiry, inquiryCurrentType: any, router: Router, route: ActivatedRoute) {
        return () => {
            const data = (() => {
                switch (inquiry.type) {
                    case inquiryType.preschool:
                        return {
                            institutions: editInstitutionsComponent.selectedInstitutions
                        };
                    case inquiryType.school:
                        return {
                            schoolClasses: editInstitutionsComponent.selectedInstitutions,
                            IsLearnEducCenter: editInstitutionsComponent.form.controls.IsLearnEducCenter.value
                        }
                    default:
                        break;
                }
            })();
            this.storageService.set(inquiryCurrentType, data);
            router.navigate(["../fileAttachmentStep"], { relativeTo: route });
        }
    }
    inverseActionInsitutionStep(inquiry: Inquiry, router: Router, route: ActivatedRoute) {
        return () => {
            const stepName = inquiry.type == inquiryType.preschool ? "inquiryInfoStep" : "schoolInquiryInfoStep";
            router.navigate([`../${stepName}`], { relativeTo: route });
        }
    }

    primaryActionFileAttachmentStep(editFileAttachmentsComponent: EditFileAttachmentsComponent, inquiryType: any, router: Router, route: ActivatedRoute) {
        return () => {
            this.inquiryService.saveFileAttachments(editFileAttachmentsComponent, (patch) => {
                this.storageService.set(inquiryType, patch);
            });
            router.navigate(["../previewStep"], { relativeTo: route });
        }
    }
    inverseActionFileAttachmentStep(inquiryCurrentType: any, router: Router, route: ActivatedRoute) {
        return () => {
            switch (inquiryCurrentType) {
                case inquiryType.preschool:
                    router.navigate(["../preschoolInstitutionStep"], { relativeTo: route });
                    break;
                case inquiryType.school:
                    router.navigate(["../schoolInstitutionStep"], { relativeTo: route });
                    break;
                case inquiryType.healthCamp:
                    router.navigate(["../healthCampStep"], { relativeTo: route });
                    break;
                default:
                    break;
            }
        }
    }

    primaryActionPreviewStep(inquiry: Inquiry, inquiryType: any, router: Router, route: ActivatedRoute) {
        return () => {
            timer(1000).pipe().subscribe((response) => {
                inquiry.type = inquiryType;
                this.inquiryService.create(inquiry).subscribe(inquiry => {
                    router.navigate([`../registerComplete/${inquiry.id}`], { relativeTo: route });
                });
            })
        }
    }
    inverseActionPreviewStep(router: Router, route: ActivatedRoute) {
        return () => {
            router.navigate(["../fileAttachmentStep"], { relativeTo: route });
        }
    }

    primaryActionRegisterComplete(router: Router, route: ActivatedRoute) {
        return () => {
            router.navigate(["../../childrenStep"], { relativeTo: route });
        }
    }
    inverseActionRegisterComplete(inquiryId: string, router: Router) {
        return () => {
            router.navigate(["inquiry", inquiryId]);
        }
    }

    update(inquiry: Inquiry, patch: object, data: { $inquiry: BehaviorSubject<Inquiry> }) {
        this.storageService.set(inquiry.type, patch);
        Object.assign(inquiry, patch);
        data.$inquiry.next(inquiry);
    }

    primaryActionChildrenDialog(editChildrenComponent: EditChildrenComponent, inquiry: Inquiry,
        data: { $inquiry: BehaviorSubject<Inquiry> }, dialogRef: MatDialogRef<EditChildrenComponent>) {
        return () => {
            this.inquiryService.saveChildren(editChildrenComponent,
                (patch: { children:Array<Child>, specHealth:SpecHealth }) => this.update(inquiry, patch, data));
            dialogRef.close();
        }
    }

    primaryActionCurrentEducationsDialog(currentEducationPlaceEditComponent: EditCurrentEducationPlaceComponent, inquiry: Inquiry,
        data: { $inquiry: BehaviorSubject<Inquiry> }, dialogRef: MatDialogRef<EditCurrentEducationPlaceDialogComponent>) {
        return () => {
            this.inquiryService.saveCurrentEducationPlace(currentEducationPlaceEditComponent,
                (patch) => this.update(inquiry, patch, data));
            dialogRef.close();
        }
    }

    primaryActionFileAttachmentsDialog(fileAttachmentsEditComponent: EditFileAttachmentsComponent, inquiry: Inquiry,
        data: { $inquiry: BehaviorSubject<Inquiry> }, dialogRef: MatDialogRef<EditFileAttachmentsDialogComponent>) {
        return () => {
            this.inquiryService.saveFileAttachments(fileAttachmentsEditComponent,
                (patch) => this.update(inquiry, patch, data));
            dialogRef.close();
        }
    }

    primaryActionInquiryInfoDialog(editInquiryInfoComponent: EditInquiryInfoComponent, inquiry: Inquiry,
        data: { $inquiry: BehaviorSubject<Inquiry> }, dialogRef: MatDialogRef<EditInquiryInfoDialogComponent>) {
        return () => {
            this.inquiryService.saveInquiryInfo(editInquiryInfoComponent,
                (patch) => this.update(inquiry, patch, data));
            dialogRef.close();
        }
    }

    primaryActionPreschoolInstitutionDialog(editInstitutionsComponent: EditInstitutionsComponent, inquiry: Inquiry,
        data: { $inquiry: BehaviorSubject<Inquiry> }, dialogRef: MatDialogRef<EditPreschoolInstitutionDialogComponent>) {
        return () => {
            this.inquiryService.saveWishInstitutions(editInstitutionsComponent,
                (patch) => this.update(inquiry, patch, data));
            dialogRef.close();
        }
    }

    primaryActionPrivilegeDialog(privilegeEditComponent: PrivilegeEditComponent, privilege: Privilege,
        data: { $privilege: BehaviorSubject<Privilege> }, dialogRef: MatDialogRef<EditPrivilegeDialogComponent>) {
        return () => { };
        // return () => {
        //     this.inquiryService.savePrivilege(privilegeEditComponent,
        //         (patch) => this.update(inquiry, patch, data));
        //     dialogRef.close();
        // }
    }

    primaryActionSchoolInquiryInfoDialog(editSchoolInquiryInfoComponent: EditSchoolInquiryInfoComponent, inquiry: Inquiry,
        data: { $inquiry: BehaviorSubject<Inquiry> }, dialogRef: MatDialogRef<EditSchoolInquiryInfoDialogComponent>) {
        return () => {
            this.inquiryService.saveSchoolInquiryInfo(editSchoolInquiryInfoComponent,
                (patch) => this.update(inquiry, patch, data));
            dialogRef.close();
        }
    }
}