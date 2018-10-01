import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EditContactInfoComponent } from '../modules/inquiry/shared/components/edit-contact-info/edit-contact-info.component';
import { EditCurrentEducationPlaceComponent } from '../modules/inquiry/shared/components/edit-current-education-place/edit-current-education-place.component';
import { EditInquiryInfoComponent } from '../modules/inquiry/shared/components/edit-inquiry-info/edit-inquiry-info.component';
import { EditInstitutionsComponent } from '../modules/inquiry/shared/components/edit-institutions/edit-institutions.component';
import { EditPersonComponent } from '../modules/inquiry/shared/components/edit-person/edit-person.component';
import { WizardStorageService } from '../modules/wizard/shared/wizard-storage.service';
import { CommonService } from '../shared/common.service';
import { AttachmentType } from '../shared/models/attachment-type.enum';
import { ApplicantType } from './applicant-type.enum';
import { PrivilegeEditComponent } from './components/privilege-edit/privilege-edit.component';
import { DublicatesFinder } from './dublicates-finder';
import { HttpInterceptor } from './http-interceptor';
import { AgeGroup } from './models/age-group';
import { ContactInfo } from './models/contact-info';
import { CurrentEducationPlace } from './models/current-education-place';
import { DistributionParams } from './models/distribution-params';
import { Guid } from './models/guid';
import { Inquiry } from './models/inquiry';
import { InquiryInfo } from './models/inquiry-info';
import { Parent } from './models/parent';
import { PortalIdentity } from './models/portal-identity';
import { Privilege } from './models/privilege';
import { RegisterSource } from './models/register-source.enum';
import { Status } from './models/status';
import { StayMode } from './models/stay-mode';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseUrl = "app/inquiries"
  constructor(private http: HttpInterceptor, private storageService: WizardStorageService, private commonService: CommonService) { }

  saveApplicant(inquiry: Inquiry, editPersonComponent: EditPersonComponent, update: (patch: object) => void): void {
    if (inquiry.applicantType != ApplicantType.Applicant) return;

    let applicant = this.commonService.buildApplicant(editPersonComponent, inquiry.applicantType);
    if (DublicatesFinder.betweenApplicantParent(inquiry.applicant, inquiry.parent)) return;
    if (DublicatesFinder.betweenApplicantChildren(applicant, inquiry.children)) return;
    if (DublicatesFinder.betweenChildren(inquiry.children)) return;
    update({ applicant: applicant });
  }

  saveParent(inquiry: Inquiry, editPersonComponent: EditPersonComponent, update: (patch: object) => void, addCondition: boolean = true): void {
    let parent: Parent;
    if (inquiry.applicantType == ApplicantType.Parent && addCondition) {
      parent = this.commonService.buildParent(editPersonComponent, inquiry.applicantType);
      if (DublicatesFinder.betweenParentChildren(parent, inquiry.children)) return;
    } else if (inquiry.applicantType == ApplicantType.Applicant && addCondition) {
      parent = this.commonService.buildParent(editPersonComponent, inquiry.applicantType);
      if (DublicatesFinder.betweenApplicantParent(inquiry.applicant, parent)) return;
      if (DublicatesFinder.betweenApplicantChildren(inquiry.applicant, inquiry.children)) return;
      if (DublicatesFinder.betweenParentChildren(parent, inquiry.children)) return;
    }
    if (!!parent) update({ parent: parent });
  }

  saveInquiryInfo(editInquiryInfoComponent: EditInquiryInfoComponent, update: (patch: object) => void): void {
    const inquiryInfo = (() => {
      const distributionParams = DistributionParams.constructFromForm(editInquiryInfoComponent.distributionParamsComponent.inquiryInfoForm);
      const stayMode = StayMode.constructFromForm(editInquiryInfoComponent.stayModeComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
      const ageGroup = AgeGroup.constructFromForm(editInquiryInfoComponent.ageGroupComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
      return new InquiryInfo(distributionParams, stayMode, ageGroup);
    })();
    update({ inquiryInfo: inquiryInfo });
  }

  saveWishInstitutions(editInstitutionComponent: EditInstitutionsComponent, update: (patch: object) => void): void {
    const institutions = (() => {
      return editInstitutionComponent.selectedInstitutions;
    })();
    update({ institutions: institutions });
  }

  savePrivilege(privilegeEditComponent: PrivilegeEditComponent, update: (patch: object) => void): void {
    const privilege: Privilege = (() => {
      let result = new Privilege();
      if (!privilegeEditComponent.privilegeForm.controls.withoutPrivilege.value) {
        result.id = privilegeEditComponent.privilegeForm.controls.privilege.value.id;
        result.name = privilegeEditComponent.privilegeForm.controls.privilege.value.name;
        result.privilegeOrder = privilegeEditComponent.privilegeForm.controls.privilegeOrder.value;
        result.privilegeProofDocument =
          this.commonService.getDocumentByType([privilegeEditComponent.confirmationProofDocumentComponent], AttachmentType.PrivilegeProofDocument);
      }
      return result;
    })();
    update({ privilege: privilege });
  }

  saveContactInfo(editContactInfoComponent: EditContactInfoComponent, update: (patch: object) => void) {
    const contactInfo = new ContactInfo(editContactInfoComponent.contactsForm);
    update({ contactInfo: contactInfo })
    //this.storageService.set(this.inquiryType, { contactInfo: contactInfo })
  }

  saveCurrentEducationPlace(editCurrentEducationPlaceComponent: EditCurrentEducationPlaceComponent, update: (patch: object) => void): void {
    const currentEducationPlace: CurrentEducationPlace = (() => {
      const place = new CurrentEducationPlace(editCurrentEducationPlaceComponent.currentPlaceForm.value["municipality"],
        editCurrentEducationPlaceComponent.currentPlaceForm.value["institutionType"], editCurrentEducationPlaceComponent.currentPlaceForm.value["institution"],
        editCurrentEducationPlaceComponent.currentPlaceForm.value["isOther"], editCurrentEducationPlaceComponent.currentPlaceForm.value["other"],
        editCurrentEducationPlaceComponent.groups.find(group => group.id == editCurrentEducationPlaceComponent.currentPlaceForm.value["group"]));
      return place;
    })();
    update({ currentEducationPlace: currentEducationPlace });
  }

  create(inquiry: Inquiry): Observable<Inquiry> {
    // let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    // inquiry.id = Guid.newGuid();
    // return this.http.post(this.baseUrl, inquiry, options).pipe(map(result => {
    //   return <Inquiry>result.json();
    // }));
    inquiry.id = Guid.newGuid();
    inquiry.version = new Date();
    inquiry.registerDateTime = new Date();
    inquiry.number = "46205/ЗЗ/18091213";
    inquiry.registerSource = RegisterSource.Ws;
    inquiry.addInformation = "доп. инфа по заявлению";
    inquiry.portalIdentity = new PortalIdentity(Guid.newGuid(), "123 внешний id");
    inquiry.status = new Status(Guid.newGuid(), "Новое");
    this.storageService.set("preschool", inquiry);
    return of(this.storageService.get("preschool"));
  }

  get(id: string): BehaviorSubject<Inquiry> {
    if (!id) return Observable.create();
    return new BehaviorSubject<Inquiry>(this.storageService.get("preschool"));
    // const url = `${this.baseUrl}?id=${id}`;
    // return this.http.get(url).pipe(map(result => {
    //   const inquiries = <Array<Inquiry>>result.json();
    //   return inquiries[0];
    // }));
  }
}
