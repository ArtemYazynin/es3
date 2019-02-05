import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { environment } from '../../environments/environment';
import { EditChildrenComponent } from '../modules/inquiry/shared/components/edit-children/edit-children.component';
import { EditCitizenshipsComponent } from '../modules/inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { EditContactInfoComponent } from '../modules/inquiry/shared/components/edit-contact-info/edit-contact-info.component';
import { EditCurrentEducationPlaceComponent } from '../modules/inquiry/shared/components/edit-current-education-place/edit-current-education-place.component';
import { EditFileAttachmentsComponent } from '../modules/inquiry/shared/components/edit-file-attachments/edit-file-attachments.component';
import { EditInstitutionsComponent } from '../modules/inquiry/shared/components/edit-institutions/edit-institutions.component';
import { EditPersonComponent } from '../modules/inquiry/shared/components/edit-person/edit-person.component';
import { EditPreschoolInquiryInfoComponent } from '../modules/inquiry/shared/components/edit-preschool-inquiry-info/edit-preschool-inquiry-info.component';
import { CommonService } from '../shared/common.service';
import { AttachmentType } from '../shared/models/attachment-type.enum';
import { EditPetitionComponent } from './../modules/inquiry/shared/components/edit-petition/edit-petition.component';
import { EditConfirmationDocumentComponent } from './components/edit-confirmation-document/edit-confirmation-document.component';
import { EditPrivilegeComponent } from './components/edit-privilege/edit-privilege.component';
import { EditSchoolInquiryInfoComponent } from './components/edit-school-inquiry-info/edit-school-inquiry-info.component';
import { DataSourceService } from './data-source.service';
import { DublicatesFinder } from './dublicates-finder';
import { AgeGroup } from './models/age-group.model';
import { Applicant } from './models/applicant.model';
import { Child } from './models/child.model';
import { ContactInfo } from './models/contact-info.model';
import { CurrentEducationPlace } from './models/current-education-place.model';
import { DistributionParams } from './models/distribution-params.model';
import { Guid } from './models/guid';
import { InquiryInfo } from './models/inquiry-info.model';
import { Inquiry } from './models/inquiry.model';
import { Parent } from './models/parent.model';
import { Person } from './models/person.model';
import { Petition } from './models/petition.model';
import { PortalIdentity } from './models/portal-identity.model';
import { Privilege } from './models/privilege.model';
import { RegisterSource } from './models/register-source.enum';
import { SchoolInquiryInfo } from './models/school-inquiry-info.model';
import { SpecHealth } from './models/spec-health.model';
import { Status } from './models/status.model';
import { StayMode } from './models/stay-mode.model';
import { PetitionType } from './petition-type.enum';
import { Es3HttpClient } from './es3-http-client';

@Injectable()
export class InquiryService {
  private dataSource: DataSourceService<Inquiry>;
  constructor(http: Es3HttpClient, injector: Injector, private commonService: CommonService) {
    this.dataSource = new DataSourceService<Inquiry>(http, injector, "inquiries");
  }

  saveChildren(editChildrenComponent: EditChildrenComponent, update: (patch: { children: Array<Child>, specHealth: SpecHealth }) => void): void {
    let result = editChildrenComponent.getResult();
    if (editChildrenComponent.owner) {
      if (editChildrenComponent.owner.relationType) {
        if (DublicatesFinder.betweenChildren(result.children) && DublicatesFinder.betweenParentChildren(editChildrenComponent.owner as Parent, result.children))
          return;
      }
      else {
        if (DublicatesFinder.betweenChildren(result.children) && DublicatesFinder.betweenApplicantChildren(editChildrenComponent.owner as Applicant, result.children))
          return;
      }
    }
    update(result);
  }

  saveInquiryInfo(editInquiryInfoComponent: EditPreschoolInquiryInfoComponent, update: (patch: object) => void): void {
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
    if (editInstitutionsComponent.inquiryType == "school")
      update({ institutions: institutions });
    else {
      update({ schoolClasses: editInstitutionsComponent.selectedInstitutions, IsLearnEducCenter: IsLearnEducCenter });
    }
  }

  savePrivilege(privilegeEditComponent: EditPrivilegeComponent, update: (patch: object) => void): void {
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
      haveDigitalSignature: editFileAttachmentsComponent.inquiry.haveDigitalSignature,
      files: files
    })
  }

  savePetition(editPetitionComponent: EditPetitionComponent, update: (patch: object) => void) {
    const id = "1";
    const petition = new Petition(id, new Date(), id, editPetitionComponent.form.controls.familyInfo.value,
      editPetitionComponent.form.controls.comment.value);
    if (editPetitionComponent.form.controls.petitionType.value == PetitionType.Organization)
      petition.organizationName = editPetitionComponent.form.controls.organizationName.value;
    else {
      const fio = editPetitionComponent.fullNameComponent.getResult();
      petition.person = new Person(fio.lastname, fio.firstname, fio.middlename, null, fio.noMiddlename);
      petition.person.identityCard = editPetitionComponent.identityCardComponent.getResult();
    }

    update({ petition: petition });
  }

  create(inquiry: Inquiry): Observable<Inquiry> {
    if (!environment.production) {
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
        delete child["$specHealthDocument"];
        child.id = Guid.newGuid();
        if (child.specHealthDocument) child.specHealthDocument.id = Guid.newGuid();
      })
      inquiry.contactInfo.id = Guid.newGuid();
      if (inquiry.schoolInquiryInfo) {
        inquiry.schoolInquiryInfo.id = Guid.newGuid();
      }
      if (inquiry.inquiryInfo) {
        inquiry.inquiryInfo.id = Guid.newGuid();
      }
      inquiry.files.forEach(file => {
        file.id = Guid.newGuid();
      });
    }

    return this.dataSource.post(inquiry);
  }

  update(id: string, inquiry: Inquiry): Observable<Inquiry> {
    inquiry.children.forEach(child => {
      delete child["$specHealthDocument"];
    });
    return this.dataSource.put(id, inquiry);
  }

  get(id: string): Observable<Inquiry> {
    return this.dataSource.get(id).pipe(map(x => new Inquiry(x)));
  }



  updateInquiryPropery(id: string, objProp: { id: string }) {
    if (!id) return;
    if (!environment.production) {
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
