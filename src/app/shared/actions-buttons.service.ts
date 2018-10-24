import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, timer } from 'rxjs';
import { InquiryService, inquiryType } from '.';
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

@Injectable()
export class ActionsButtonsService {

    constructor(private storageService: WizardStorageService, private inquiryService: InquiryService) { }

    primaryActionChildrenStep(editChildrenComponent: EditChildrenComponent, inquiryType: any, router: Router, route: ActivatedRoute) {
        return () => {
            this.inquiryService.saveChildren(editChildrenComponent, (patch) => {
                this.storageService.set(inquiryType, patch);
            })
            router.navigate(["../currentEducationPlaceStep"], { relativeTo: route });
        }
    }
    inverseActionChildrenStep(router: Router) {
        return () => {
            router.navigate(["/"]);
        }
    }

    primaryActionApplicantTypeStep(inquiry: Inquiry, inquiryType: any, applicantType: ApplicantType, router: Router, route: ActivatedRoute) {
        return () => {
            Object.assign(inquiry, { applicantType: applicantType });
            switch (applicantType) {
                case ApplicantType.Applicant:
                    this.storageService.set(inquiryType, inquiry)
                    router.navigate(["../applicantStep"], { relativeTo: route });
                    break;
                case ApplicantType.Parent:
                    inquiry.applicant = undefined;
                    this.storageService.set(inquiryType, inquiry)
                    router.navigate(["../parentStep"], { relativeTo: route });
                    break;
                case ApplicantType.Child:
                    inquiry.applicant = undefined;
                    inquiry.parent = undefined;
                    this.storageService.set(inquiryType, inquiry);
                    router.navigate(["../contactInfoStep"], { relativeTo: route });
                default:
                    break;
            }
        }
    }
    inverseActionApplicantTypeStep(router: Router, route: ActivatedRoute) {
        return () => {
            router.navigate(["../currentEducationPlaceStep"], { relativeTo: route });
        }
    }

    primaryActionParentStep(editPersonComponent: EditPersonComponent, inquiry: Inquiry, inquiryType: any, router: Router, route: ActivatedRoute) {
        return () => {
            this.inquiryService.saveParent(inquiry, editPersonComponent, (patch) => {
                this.storageService.set(inquiryType, patch);
            })
            router.navigate(["../contactInfoStep"], { relativeTo: route });
        }
    }
    inverseActionParentStep(inquiry: Inquiry, router: Router, route: ActivatedRoute) {
        return () => {
            if (inquiry.applicantType == ApplicantType.Applicant) {
                router.navigate(["../applicantStep"], { relativeTo: route });
            } else {
                router.navigate(["../applicantTypeStep"], { relativeTo: route });
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

    primaryActionApplicantStep(editPersonComponent: EditPersonComponent, inquiry: Inquiry, inquiryType: any, router: Router, route: ActivatedRoute) {
        return () => {
            this.inquiryService.saveApplicant(inquiry, editPersonComponent, (patch) => {
                this.storageService.set(inquiryType, patch);
            });

            if (inquiry.applicantType == ApplicantType.Parent) {
                router.navigate(["../contactInfoStep"], { relativeTo: route });
            } else {
                router.navigate(["../parentStep"], { relativeTo: route });
            }
        }
    }
    inverseActionApplicantStep(router: Router, route: ActivatedRoute) {
        return () => {
            router.navigate(["../applicantTypeStep"], { relativeTo: route });
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

    primaryActionPrivilegeStep(privilegeEditComponent: PrivilegeEditComponent, inquiry: Inquiry, inquiryCurrentType: any, router: Router, route: ActivatedRoute) {
        return () => {
            this.inquiryService.savePrivilege(privilegeEditComponent, (patch) => {
                this.storageService.set(inquiry.type, patch);
            });
            switch (inquiryCurrentType) {
                case inquiryType.profEducation:
                    router.navigate(["../educDocumentInfoStep"], { relativeTo: route });
                    break;
                case inquiryType.preschool:
                    router.navigate(["../inquiryInfoStep"], { relativeTo: route });
                    break;
                case inquiryType.school:
                    router.navigate(["../schoolInquiryInfoStep"], { relativeTo: route });
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
                (patch) => this.update(inquiry, patch, data));
            dialogRef.close();
        }
    }

    primaryActionContactInfoDialog(editContactInfoComponent: EditContactInfoComponent, inquiry: Inquiry,
        data: { $inquiry: BehaviorSubject<Inquiry> }, dialogRef: MatDialogRef<EditContactInfoDialogComponent>) {
        return () => {
            this.inquiryService.saveContactInfo(editContactInfoComponent,
                (patch) => this.update(inquiry, patch, data));
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

    primaryActionPersonDialog(editPersonComponent: EditPersonComponent, inquiry: Inquiry,
        data: { $inquiry: BehaviorSubject<Inquiry>, modelType: ApplicantType }, dialogRef: MatDialogRef<EditPersonDialogComponent>) {
        return () => {
            const update = (patch: object) => {
                this.storageService.set(inquiry.type, patch);
                Object.assign(inquiry, patch);
                data.$inquiry.next(inquiry);
            }

            this.inquiryService.saveParent(inquiry, editPersonComponent, update, data.modelType == ApplicantType.Parent);
            if (data.modelType == ApplicantType.Applicant) {
                this.inquiryService.saveApplicant(inquiry, editPersonComponent, update);
            }
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

    primaryActionPrivilegeDialog(privilegeEditComponent: PrivilegeEditComponent, inquiry: Inquiry,
        data: { $inquiry: BehaviorSubject<Inquiry> }, dialogRef: MatDialogRef<EditPrivilegeDialogComponent>) {
        return () => {
            this.inquiryService.savePrivilege(privilegeEditComponent,
                (patch) => this.update(inquiry, patch, data));
            dialogRef.close();
        }
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