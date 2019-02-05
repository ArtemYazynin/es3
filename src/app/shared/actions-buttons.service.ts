import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, timer } from 'rxjs';
import { Child, DublicatesFinder, InquiryService, inquiryType, Parent, SpecHealth } from '.';
import { EditFileAttachmentsDialogComponent } from '../modules/inquiry/edit-file-attachments-dialog/edit-file-attachments-dialog.component';
import { EditChildrenComponent } from '../modules/inquiry/shared/components/edit-children/edit-children.component';
import { EditCitizenshipsComponent } from '../modules/inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { EditContactInfoComponent } from '../modules/inquiry/shared/components/edit-contact-info/edit-contact-info.component';
import { EditCurrentEducationPlaceComponent } from '../modules/inquiry/shared/components/edit-current-education-place/edit-current-education-place.component';
import { EditFileAttachmentsComponent } from '../modules/inquiry/shared/components/edit-file-attachments/edit-file-attachments.component';
import { EditInstitutionsComponent } from '../modules/inquiry/shared/components/edit-institutions/edit-institutions.component';
import { EditPersonComponent } from '../modules/inquiry/shared/components/edit-person/edit-person.component';
import { EditPreschoolInquiryInfoComponent } from '../modules/inquiry/shared/components/edit-preschool-inquiry-info/edit-preschool-inquiry-info.component';
import { WizardStorageService } from '../modules/wizard/shared';
import { ApplicantType } from './applicant-type.enum';
import { EditPrivilegeComponent } from './components/edit-privilege/edit-privilege.component';
import { RelationTypeComponent } from './components/relation-type/relation-type.component';
import { Inquiry } from './models/inquiry.model';

@Injectable()
export class ActionsButtonsService {
    constructor(private storageService: WizardStorageService, private inquiryService: InquiryService, private router: Router, private route: ActivatedRoute) { }

    primaryActionChildrenStep(editChildrenComponent: EditChildrenComponent, inquiryType: any) {
        return () => {
            this.inquiryService.saveChildren(editChildrenComponent, (patch: { children: Array<Child>, specHealth: SpecHealth }) => {
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

    primaryActionPrivilegeStep(privilegeEditComponent: EditPrivilegeComponent, inquiry: Inquiry, route: ActivatedRoute) {
        return () => {
            this.inquiryService.savePrivilege(privilegeEditComponent, (patch) => {
                this.storageService.set(inquiry.type, patch);
            });
            switch (inquiry.type) {
                case inquiryType.profEducation:
                    this.router.navigate(["../educDocumentInfoStep"], { relativeTo: route });
                    break;
                case inquiryType.preschool:
                    this.router.navigate(["../preschoolInquiryInfoStep"], { relativeTo: route });
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

    primaryActionInquiryInfoStep(editInquiryInfoComponent: EditPreschoolInquiryInfoComponent, inquiryType: any, router: Router, route: ActivatedRoute) {
        return () => {
            this.inquiryService.saveInquiryInfo(editInquiryInfoComponent, (patch) => {
                this.storageService.set(inquiryType, patch);
            })
            router.navigate(["../institutionStep"], { relativeTo: route });
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
            const stepName = inquiry.type == inquiryType.preschool ? "preschoolInquiryInfoStep" : "schoolInquiryInfoStep";
            router.navigate([`../${stepName}`], { relativeTo: route });
        }
    }
    inverseActionFileAttachmentStep(inquiryCurrentType: any, router: Router, route: ActivatedRoute) {
        return () => {
            switch (inquiryCurrentType) {
                case inquiryType.preschool:
                    router.navigate(["../institutionStep"], { relativeTo: route });
                    break;
                case inquiryType.school:
                    router.navigate(["../institutionStep"], { relativeTo: route });
                    break;
                case inquiryType.healthCamp:
                    router.navigate(["../healthCampStep"], { relativeTo: route });
                    break;
                default:
                    break;
            }
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
                (patch: { children: Array<Child>, specHealth: SpecHealth }) => this.update(inquiry, patch, data));
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
}