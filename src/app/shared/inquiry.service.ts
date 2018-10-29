import { Inject, Injectable, ChangeDetectorRef } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { empty, Observable, zip, Subscription, forkJoin, BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { SERVER_URL } from '../app.module';
import { EditContactInfoComponent } from '../modules/inquiry/shared/components/edit-contact-info/edit-contact-info.component';
import { EditCurrentEducationPlaceComponent } from '../modules/inquiry/shared/components/edit-current-education-place/edit-current-education-place.component';
import { EditFileAttachmentsComponent } from '../modules/inquiry/shared/components/edit-file-attachments/edit-file-attachments.component';
import { EditInquiryInfoComponent } from '../modules/inquiry/shared/components/edit-inquiry-info/edit-inquiry-info.component';
import { EditInstitutionsComponent } from '../modules/inquiry/shared/components/edit-institutions/edit-institutions.component';
import { EditPersonComponent } from '../modules/inquiry/shared/components/edit-person/edit-person.component';
import { WizardStorageService } from '../modules/wizard/shared/wizard-storage.service';
import { CommonService } from '../shared/common.service';
import { AttachmentType } from '../shared/models/attachment-type.enum';
import { ApplicantType } from './applicant-type.enum';
import { EditSchoolInquiryInfoComponent } from './components/edit-school-inquiry-info/edit-school-inquiry-info.component';
import { PrivilegeEditComponent } from './components/privilege-edit/privilege-edit.component';
import { DublicatesFinder } from './dublicates-finder';
import { HttpInterceptor } from './http-interceptor';
import { AgeGroup } from './models/age-group.model';
import { Applicant } from './models/applicant.model';
import { ContactInfo } from './models/contact-info.model';
import { CurrentEducationPlace } from './models/current-education-place.model';
import { DistributionParams } from './models/distribution-params.model';
import { Guid } from './models/guid';
import { InquiryInfo } from './models/inquiry-info.model';
import { Inquiry } from './models/inquiry.model';
import { Parent } from './models/parent.model';
import { Privilege } from './models/privilege.model';
import { SchoolInquiryInfo } from './models/school-inquiry-info.model';
import { StayMode } from './models/stay-mode.model';
import { RegisterSource } from './models/register-source.enum';
import { PortalIdentity } from './models/portal-identity.model';
import { Status } from './models/status.model';
import { ConfirmationDocumentService } from './confirmation-document.service';
import { ConfirmationDocument } from './models/confirmation-document.model';
import { map, takeUntil, tap, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { EditChildrenComponent } from '../modules/inquiry/shared/components/edit-children/edit-children.component';
import { EditCitizenshipsComponent } from '../modules/inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { EditConfirmationDocumentComponent } from './components/edit-confirmation-document/edit-confirmation-document.component';

@Injectable()
export class InquiryService {
  private baseUrl = `${this.serverUrl}/inquiries`

  constructor(private http: Http, private storageService: WizardStorageService, private commonService: CommonService,
    @Inject(SERVER_URL) private serverUrl, private confirmationDocumentService: ConfirmationDocumentService) { }

  saveApplicant(inquiry: Inquiry, editPersonComponent: EditPersonComponent, editCitizenshipsComponent: EditCitizenshipsComponent,
    editConfirmationDocumentComponent: EditConfirmationDocumentComponent): Inquiry {
    const fullnameResult = editPersonComponent.fullnameComponent.getResult();
    const applicant = new Applicant(fullnameResult.lastname, fullnameResult.firstname, fullnameResult.middlename,
      editPersonComponent.snilsComponent.snils, fullnameResult.noMiddlename, undefined, undefined, undefined);
    applicant.identityCard = editPersonComponent.identityCardComponent.getResult();
    applicant.applicantRepresentParentDocument = editConfirmationDocumentComponent.getResult();
   

    const citizenshipsWithAddresses = editCitizenshipsComponent.getResult();
    applicant.countryStateApplicantDocument = citizenshipsWithAddresses.document;
    applicant.citizenships = citizenshipsWithAddresses.citizenships;
    Object.assign(applicant, citizenshipsWithAddresses.addresses);

    if (DublicatesFinder.betweenApplicantParent(inquiry.applicant, inquiry.parent)
      || DublicatesFinder.betweenApplicantChildren(applicant, inquiry.children)
      || DublicatesFinder.betweenChildren(inquiry.children))
      return;

    if (inquiry.applicant) {
      Object.assign(inquiry.applicant, applicant);
    } else {
      inquiry.applicant = applicant;
    }
    return inquiry;
  }

  saveParent(inquiry: Inquiry, editPersonComponent: EditPersonComponent, update: (patch: object) => void, addCondition: boolean = true): void {
    // let parent: Parent;
    // if (inquiry.applicantType == ApplicantType.Parent && addCondition) {
    //   parent = this.commonService.buildParent(editPersonComponent, inquiry.applicantType);
    //   if (DublicatesFinder.betweenParentChildren(parent, inquiry.children)) return;
    // } else if (inquiry.applicantType == ApplicantType.Applicant && addCondition) {
    //   parent = this.commonService.buildParent(editPersonComponent, inquiry.applicantType);
    //   if (DublicatesFinder.betweenApplicantParent(inquiry.applicant, parent)) return;
    //   if (DublicatesFinder.betweenApplicantChildren(inquiry.applicant, inquiry.children)) return;
    //   if (DublicatesFinder.betweenParentChildren(parent, inquiry.children)) return;
    // }
    // if (!!parent) update({ parent: parent });
  }

  saveChildren(editChildrenComponent: EditChildrenComponent, update: (patch: object) => void): void {
    let children = editChildrenComponent.getChildren();
    if (editChildrenComponent.owner) {
      if (editChildrenComponent.owner.relationType) {
        if (DublicatesFinder.betweenChildren(children) && DublicatesFinder.betweenParentChildren(editChildrenComponent.owner as Parent, children))
          return;
      }
      else {
        if (DublicatesFinder.betweenChildren(children) && DublicatesFinder.betweenApplicantChildren(editChildrenComponent.owner as Applicant, children))
          return;
      }
    }
    update({ children: children });
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

  saveWishInstitutions(editInstitutionsComponent: EditInstitutionsComponent, update: (patch: object) => void): void {
    const IsLearnEducCenter = (() => {
      if (editInstitutionsComponent.form.controls.IsLearnEducCenter)
        return editInstitutionsComponent.form.controls.IsLearnEducCenter.value;
    })();
    const institutions = (() => {
      return editInstitutionsComponent.selectedInstitutions;
    })();
    if (editInstitutionsComponent.inquiry.type == "preschool")
      update({ institutions: institutions });
    else {
      update({ schoolClasses: editInstitutionsComponent.selectedInstitutions, IsLearnEducCenter: IsLearnEducCenter });
    }
  }

  savePrivilege(privilegeEditComponent: PrivilegeEditComponent, update: (patch: object) => void): void {
    if (privilegeEditComponent.privilegeForm.controls.withoutPrivilege.value) {
      update({ privilege: undefined })
    } else {
      update(
        {
          privilege: (() => {
            let result = new Privilege();
            result.id = privilegeEditComponent.privilegeForm.controls.privilege.value.id;
            result.name = privilegeEditComponent.privilegeForm.controls.privilege.value.name;
            result.privilegeOrder = privilegeEditComponent.privilegeForm.controls.privilegeOrder.value;
            result.privilegeProofDocument =
              this.commonService.getDocumentByType([privilegeEditComponent.confirmationProofDocumentComponent], AttachmentType.PrivilegeProofDocument);
            return result;
          })()
        })
    }
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

  saveSchoolInquiryInfo(editSchoolInquiryInfoComponent: EditSchoolInquiryInfoComponent, update: (patch: object) => void): void {
    const schoolInquiryInfo = new SchoolInquiryInfo(editSchoolInquiryInfoComponent.form.controls.educYear.value,
      editSchoolInquiryInfoComponent.form.controls.grade.value, editSchoolInquiryInfoComponent.form.controls.specialization.value,
      editSchoolInquiryInfoComponent.form.controls.program.value.id ? editSchoolInquiryInfoComponent.form.controls.program.value : undefined);
    update({ schoolInquiryInfo: schoolInquiryInfo });
  }

  saveFileAttachments(editFileAttachmentsComponent: EditFileAttachmentsComponent, update: (patch: object) => void) {
    const files = editFileAttachmentsComponent.bunchOfFileView
      .filter(x => x.fileAttachment.file != null)
      .map(fileView => {
        let data = Object.assign({}, { name: fileView.name }, { attachmentType: fileView.fileAttachment.attachmentType }, { file: {} });
        if (isNullOrUndefined(fileView.fileAttachment.description) || fileView.fileAttachment.description == "") return data;
        Object.assign(data, { description: fileView.fileAttachment.description })
        return data;
      });

    update({
      filesInfo: {
        files: files,
        haveDigitalSignature: editFileAttachmentsComponent.haveDigitalSignature
      }
    })
  }
  create(inquiry: Inquiry): Observable<Inquiry> {
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    inquiry.id = Guid.newGuid();
    inquiry.version = new Date();
    inquiry.registerDateTime = new Date();
    inquiry.number = "46205/ЗЗ/18091213";
    inquiry.registerSource = RegisterSource.Ws;
    inquiry.addInformation = "доп. инфа по заявлению";
    inquiry.portalIdentity = new PortalIdentity(Guid.newGuid(), "123 внешний id");
    inquiry.status = new Status(Guid.newGuid(), "Новое");

    if (inquiry.parent) {
      inquiry.parent.id = Guid.newGuid();
      if (inquiry.parent.countryStateDocument) {
        inquiry.parent.countryStateDocument.id = Guid.newGuid();
      }
      if (inquiry.parent.parentRepresentChildrenDocument) {
        inquiry.parent.parentRepresentChildrenDocument.id = Guid.newGuid();
      }
    }
    if (inquiry.applicant) {
      inquiry.applicant.id = Guid.newGuid();
      if (inquiry.applicant.countryStateApplicantDocument) {
        inquiry.applicant.countryStateApplicantDocument.id = Guid.newGuid();
      }
      if (inquiry.applicant.applicantRepresentParentDocument) {
        inquiry.applicant.applicantRepresentParentDocument.id = Guid.newGuid();
      }
    }
    if (inquiry.privilege && inquiry.privilege.privilegeProofDocument) {
      inquiry.privilege.privilegeProofDocument.id = Guid.newGuid();
    }
    inquiry.children.forEach(child => {
      child.id = Guid.newGuid();
      if (child.specHealthDocument) child.specHealthDocument.id = Guid.newGuid();
    })

    return this.http.post(this.baseUrl, inquiry, options).pipe(map(result => {
      return <Inquiry>result.json();
    }));
    // inquiry.id = Guid.newGuid();
    // inquiry.version = new Date();
    // inquiry.registerDateTime = new Date();
    // inquiry.number = "46205/ЗЗ/18091213";
    // inquiry.registerSource = RegisterSource.Ws;
    // inquiry.addInformation = "доп. инфа по заявлению";
    // inquiry.portalIdentity = new PortalIdentity(Guid.newGuid(), "123 внешний id");
    // inquiry.status = new Status(Guid.newGuid(), "Новое");
    // this.storageService.set(inquiry.type, inquiry);
    // return of(this.storageService.get(inquiry.type));
  }

  update(id: string, inquiry: Inquiry): Observable<Inquiry> {
    if (!id || !inquiry) return empty();

    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    let url = `${this.baseUrl}/${id}`;
    return this.http.put(url, inquiry, options).pipe(map(result => {
      return <Inquiry>result.json();
    }));
  }

  get(id: string): Observable<Inquiry> {
    // if (!id) return Observable.create();
    // return new BehaviorSubject<Inquiry>(this.storageService.get("preschool"));
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url).pipe(map(result => {
      let inquiry = new Inquiry(result.json());

      return inquiry;
    }));
  }

  updateInquiryPropery(id: string, objProp: { id: string }) {
    if (!id) return;
    if (!environment.production) {
      // return this.get(id)
      //   .pipe(mergeMap(inquiry => {
      //     this.updateInquiry(inquiry, objProp);
      //     return this.update(inquiry.id, inquiry)
      //   }))
      this.get(id)
        .subscribe(inquiry => {
          this.updateInquiry(inquiry, objProp);
          this.update(inquiry.id, inquiry).subscribe();
        });
    }
  }
  updateInquiry(inquiry: Inquiry, inquiryProp: { id: string }) {
    if (!inquiry || !inquiryProp || !inquiryProp.id) return;
    for (const key in inquiry) {
      if (inquiry.hasOwnProperty(key)) {
        if (typeof inquiry[key] == "string") {
          if (key.toLowerCase() == "id" && inquiry[key] == inquiryProp.id) {
            Object.assign(inquiry, inquiryProp);
            break;
          }
        } else {
          this.updateInquiry(inquiry[key], inquiryProp);//recursivelly
        }
      }
    }
  }
}
