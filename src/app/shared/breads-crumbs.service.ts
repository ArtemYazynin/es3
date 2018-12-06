import { Injectable } from '@angular/core';
import { WizardStorageService } from '../modules/wizard/shared';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IBreadcrumb } from './models/ibreadcrumb';
import { ApplicantType } from './applicant-type.enum';
import { inquiryType } from './models/inquiry-type';
import { Inquiry } from './models/inquiry.model';

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
    schoolInquiryInfoStep: { systemName: "schoolInquiryInfoStep", friendlyName: this.inquiryInfoFriendlyName },
    institutionStep: { systemName: "institutionStep", friendlyName: "Выбор ОО" },
    fileAttachmentStep: { systemName: "fileAttachmentStep", friendlyName: "Копии документов" },
    previewStep: { systemName: "previewStep", friendlyName: "Предпросмотр заявления" },
    registerComplete: { systemName: "registerComplete", friendlyName: "" }
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

  initInquiryBreadsCrumbs(segments: string[]) {
    if (!segments || !segments.includes("inquiry")) return [];
    this.set({ label: "Просмотр заявления", url: `/${segments.join("/")}` });
  }

  initWizardBreadsCrumbs(segments: string[]) {
    if (!segments || !segments.includes(this.step.wizard.systemName)) return;
    const inquiry = this.storageService.get(segments[1]);
    if (!inquiry || !inquiry.type) return;

    this.set({ label: this.step.wizard.friendlyName, url: "" });
    if (segments.includes(this.step.childrenStep.systemName)) {
      this.setChildren(inquiry.type);
      return;
    }
    if (segments.includes(this.step.currentEducationPlaceStep.systemName)) {
      this.setChildren(inquiry.type);
      this.setCurrentEducationPlace(inquiry.type);
      return;
    }
    if (segments.includes(this.step.applicantTypeStep.systemName)) {
      this.stepsSet1(inquiry.type);
      return;
    }
    if (segments.includes(this.step.applicantStep.systemName)) {
      this.stepsSet1(inquiry.type);
      this.setApplicantStep(inquiry.type);
      return;
    }
    if (segments.includes(this.step.parentStep.systemName)) {
      this.stepsSet1(inquiry.type);
      if (inquiry.applicantType == ApplicantType.Applicant) {
        this.setApplicantStep(inquiry.type);
      }
      this.setParentStep(inquiry.type);
      return;
    }
    if (segments.includes(this.step.contactInfoStep.systemName)) {
      this.stepsSet1(inquiry.type);
      this.stepsSet2(inquiry);
      return;
    }

    if (segments.includes(this.step.privilegeStep.systemName)) {
      this.stepsSet1(inquiry.type);
      this.stepsSet2(inquiry);
      this.setPrivilegeStep(inquiry.type);
      return;
    }

    if (segments.includes(this.step.preschoolInquiryInfoStep.systemName)) {
      this.stepsSet1(inquiry.type);
      this.stepsSet2(inquiry);
      this.setPrivilegeStep(inquiry.type);
      this.setPreschoolInquiryInfo(inquiry.type);
      return;
    }

    if (segments.includes(this.step.schoolInquiryInfoStep.systemName)) {
      this.stepsSet1(inquiry.type);
      this.stepsSet2(inquiry);
      this.setPrivilegeStep(inquiry.type);
      this.setSchoolInquiryInfo(inquiry.type);
      return;
    }

    if (segments.includes(this.step.institutionStep.systemName)) {
      this.stepsSet1(inquiry.type);
      this.stepsSet2(inquiry);
      this.stepsSet3(inquiry);
      return;
    }

    if (segments.includes(this.step.fileAttachmentStep.systemName)) {
      this.stepsSet1(inquiry.type);
      this.stepsSet2(inquiry);
      this.stepsSet3(inquiry);
      this.setFileAttachmentStep(inquiry.type);
      return;
    }

    if (segments.includes(this.step.previewStep.systemName)) {
      this.stepsSet1(inquiry.type);
      this.stepsSet2(inquiry);
      this.stepsSet3(inquiry);
      this.setFileAttachmentStep(inquiry.type);
      this.setPreviewStep(inquiry.type);
      return;
    }
    if (segments.includes(this.step.registerComplete.systemName)) {
      this.clear();
    }
  }

  private stepsSet3(inquiry: Inquiry) {
    this.setPrivilegeStep(inquiry.type);
    switch (inquiry.type) {
      case inquiryType.preschool:
        this.setPreschoolInquiryInfo(inquiry.type);
        break;
      case inquiryType.school:
        this.setSchoolInquiryInfo(inquiry.type);
        break;

      default:
        break;
    }
    this.setInstitututionStep(inquiry.type);
  }

  private stepsSet1(inquiryType: string) {
    this.setChildren(inquiryType);
    this.setCurrentEducationPlace(inquiryType);
    this.setApplicantTypeStep(inquiryType);
  }

  private stepsSet2(inquiry: Inquiry) {
    switch (inquiry.applicantType) {
      case ApplicantType.Applicant:
        this.setApplicantStep(inquiry.type);
      case ApplicantType.Parent:
        this.setParentStep(inquiry.type);
        break;
      default:
        break;
    }
    this.setContactInfoStep(inquiry.type);
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

  private setSchoolInquiryInfo(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.schoolInquiryInfoStep.systemName, this.step.schoolInquiryInfoStep.friendlyName);
  }

  private setInstitututionStep(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.institutionStep.systemName, this.step.institutionStep.friendlyName);
  }

  private setFileAttachmentStep(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.fileAttachmentStep.systemName, this.step.fileAttachmentStep.friendlyName);
  }

  private setPreviewStep(inquiryType: string) {
    this.setCrumb(inquiryType, this.step.previewStep.systemName, this.step.previewStep.friendlyName);
  }

  private setCrumb(inquiryType: string, stepSegment: string, label: string) {
    if (!inquiryType || !stepSegment || !label) return;
    this.set({ label: label, url: `/${this.step.wizard.systemName}/${inquiryType}/${stepSegment}` });
  }


}
