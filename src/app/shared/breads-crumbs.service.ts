import { Injectable } from '@angular/core';
import { WizardStorageService } from '../modules/wizard/shared';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IBreadcrumb } from './models/ibreadcrumb';
import { ApplicantType } from './applicant-type.enum';

@Injectable()
export class BreadsCrumbsService {
  private inquiryInfoFriendlyName = "Параметры заявления";
  private step = {
    wizard: { systemName: "wizard", friendlyName: "Подача заявления" },
    childrenStep: { systemName: "childrenStep", friendlyName: "Данные ребенка" },
    currentEducationPlaceStep: { systemName: "currentEducationPlaceStep", friendlyName: "Текущее место обучения ребенка" },
    applicantTypeStep: { systemName: "applicantTypeStep", friendlyName: "Данные заявителя" },
    applicantStep: { systemName: "applicantStep", friendlyName: "Доверенное лицо" },
    parentStep: { systemName: "parentStep", friendlyName: "Законный представитель" },
    contactInfoStep: { systemName: "contactInfoStep", friendlyName: "Контактная информация" },
    privilegeStep: { systemName: "privilegeStep", friendlyName: "Льготная категория" },
    preschoolInquiryInfoStep: { systemName: "preschoolInquiryInfoStep", friendlyName: this.inquiryInfoFriendlyName },
    schoolInquiryInfoStep: { systemName: "schoolInquiryInfoStep", friendlyName: this.inquiryInfoFriendlyName }
  }
  private _breadsCrumbs: BehaviorSubject<Array<IBreadcrumb>> = new BehaviorSubject<Array<IBreadcrumb>>([]);
  constructor(private storageService: WizardStorageService, private activatedRoute: ActivatedRoute) {
  }

  get breadsCrumbs(): BehaviorSubject<Array<IBreadcrumb>> {
    return this._breadsCrumbs;
  }

  set(breadCrumb: IBreadcrumb): void {
    let value = this.breadsCrumbs.getValue();
    value.push(breadCrumb);
    this.breadsCrumbs.next(value);
  }

  clear() {
    this._breadsCrumbs.next([]);
  }

  initWizardBreadsCrumbs(segments: string[]) {
    if (!segments || !segments.includes(this.step.wizard.systemName)) return [];
    const inquiryType = segments.length == 3 ? segments[1] : undefined;
    const inquiry = this.storageService.get(inquiryType);
    if (!inquiryType) return;
    this.set({ label: this.step.wizard.friendlyName, url: "" });
    if (segments.includes(this.step.childrenStep.systemName)) {
      this.setChildren(inquiryType);
    }
    if (segments.includes(this.step.currentEducationPlaceStep.systemName)) {
      this.setChildren(inquiryType);
      this.setCurrentEducationPlace(inquiryType);
    }
    if (segments.includes(this.step.applicantTypeStep.systemName)) {
      this.setChildren(inquiryType);
      this.setCurrentEducationPlace(inquiryType);
      this.setApplicantTypeStep(inquiryType);
    }
    if (segments.includes(this.step.applicantStep.systemName)) {
      this.setChildren(inquiryType);
      this.setCurrentEducationPlace(inquiryType);
      this.setApplicantTypeStep(inquiryType);
      this.setApplicantStep(inquiryType);
    }
    if (segments.includes(this.step.parentStep.systemName)) {
      this.setChildren(inquiryType);
      this.setCurrentEducationPlace(inquiryType);
      this.setApplicantTypeStep(inquiryType);
      if (inquiry.applicantType == ApplicantType.Applicant) {
        this.setApplicantStep(inquiryType);
      }
      this.setParentStep(inquiryType);
    }
    if (segments.includes(this.step.contactInfoStep.systemName)) {
      this.setChildren(inquiryType);
      this.setCurrentEducationPlace(inquiryType);
      this.setApplicantTypeStep(inquiryType);
      switch (inquiry.applicantType) {
        case ApplicantType.Applicant:
          this.setApplicantStep(inquiryType);
        case ApplicantType.Parent:
          this.setParentStep(inquiryType);
          break;
        default:
          break;
      }
      this.setContactInfoStep(inquiryType);
    }

    if (segments.includes(this.step.privilegeStep.systemName)) {
      this.setChildren(inquiryType);
      this.setCurrentEducationPlace(inquiryType);
      this.setApplicantTypeStep(inquiryType);
      switch (inquiry.applicantType) {
        case ApplicantType.Applicant:
          this.setApplicantStep(inquiryType);
        case ApplicantType.Parent:
          this.setParentStep(inquiryType);
          break;
        default:
          break;
      }
      this.setContactInfoStep(inquiryType);
      this.setPrivilegeStep(inquiryType);
    }

    if (segments.includes(this.step.preschoolInquiryInfoStep.systemName)) {
      this.setChildren(inquiryType);
      this.setCurrentEducationPlace(inquiryType);
      this.setApplicantTypeStep(inquiryType);
      switch (inquiry.applicantType) {
        case ApplicantType.Applicant:
          this.setApplicantStep(inquiryType);
        case ApplicantType.Parent:
          this.setParentStep(inquiryType);
          break;
        default:
          break;
      }
      this.setContactInfoStep(inquiryType);
      this.setPrivilegeStep(inquiryType);
      this.setPreschoolInquiryInfo(inquiryType);
    }

    if (segments.includes(this.step.schoolInquiryInfoStep.systemName)) {
      this.setChildren(inquiryType);
      this.setCurrentEducationPlace(inquiryType);
      this.setApplicantTypeStep(inquiryType);
      switch (inquiry.applicantType) {
        case ApplicantType.Applicant:
          this.setApplicantStep(inquiryType);
        case ApplicantType.Parent:
          this.setParentStep(inquiryType);
          break;
        default:
          break;
      }
      this.setContactInfoStep(inquiryType);
      this.setPrivilegeStep(inquiryType);
      this.setSchoolInquiryInfo(inquiryType);
    }
  }

  private setChildren(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.childrenStep.systemName, this.step.childrenStep.friendlyName);
  }

  private setCurrentEducationPlace(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.currentEducationPlaceStep.systemName, this.step.currentEducationPlaceStep.friendlyName);
  }

  private setApplicantTypeStep(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.applicantTypeStep.systemName, this.step.applicantTypeStep.friendlyName);
  }

  private setApplicantStep(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.applicantStep.systemName, this.step.applicantStep.friendlyName);
  }

  private setParentStep(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.parentStep.systemName, this.step.parentStep.friendlyName);
  }

  private setContactInfoStep(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.contactInfoStep.systemName, this.step.contactInfoStep.friendlyName);
  }

  private setPrivilegeStep(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.privilegeStep.systemName, this.step.privilegeStep.friendlyName);
  }

  private setPreschoolInquiryInfo(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.preschoolInquiryInfoStep.systemName, this.step.preschoolInquiryInfoStep.friendlyName);
  }

  private setSchoolInquiryInfo(inquiryType: string){
    this.setCrumb(inquiryType, this.step.schoolInquiryInfoStep.systemName, this.step.schoolInquiryInfoStep.friendlyName);
  }

  private setCrumb(inquiryType: string, stepSegment: string, label: string) {
    if (!inquiryType || !stepSegment || !label) return;
    this.set({ label: label, url: `/${this.step.wizard.systemName}/${inquiryType}/${stepSegment}` });
  }
}
