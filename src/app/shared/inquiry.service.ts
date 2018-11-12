import { Injectable } from '@angular/core';
import { Observable, of, zip, empty, from } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { environment } from '../../environments/environment';
import { EditChildrenComponent } from '../modules/inquiry/shared/components/edit-children/edit-children.component';
import { EditCitizenshipsComponent } from '../modules/inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { EditContactInfoComponent } from '../modules/inquiry/shared/components/edit-contact-info/edit-contact-info.component';
import { EditCurrentEducationPlaceComponent } from '../modules/inquiry/shared/components/edit-current-education-place/edit-current-education-place.component';
import { EditFileAttachmentsComponent } from '../modules/inquiry/shared/components/edit-file-attachments/edit-file-attachments.component';
import { EditInquiryInfoComponent } from '../modules/inquiry/shared/components/edit-inquiry-info/edit-inquiry-info.component';
import { EditInstitutionsComponent } from '../modules/inquiry/shared/components/edit-institutions/edit-institutions.component';
import { EditPersonComponent } from '../modules/inquiry/shared/components/edit-person/edit-person.component';
import { CommonService } from '../shared/common.service';
import { AttachmentType } from '../shared/models/attachment-type.enum';
import { EditConfirmationDocumentComponent } from './components/edit-confirmation-document/edit-confirmation-document.component';
import { EditSchoolInquiryInfoComponent } from './components/edit-school-inquiry-info/edit-school-inquiry-info.component';
import { PrivilegeEditComponent } from './components/privilege-edit/privilege-edit.component';
import { DublicatesFinder } from './dublicates-finder';
import { InquiryDataSourceService } from './inquiry-data-source.service';
import { AgeGroup } from './models/age-group.model';
import { Applicant } from './models/applicant.model';
import { ContactInfo } from './models/contact-info.model';
import { FromPlace } from './models/from-place.model';
import { DistributionParams } from './models/distribution-params.model';
import { Guid } from './models/guid';
import { InquiryInfoRequest } from './models/inquiry-info-request.model';
import { InquiryRequest, Inquiry } from './models/inquiry-request.model';
import { Parent } from './models/parent.model';
import { PortalIdentity } from './models/portal-identity.model';
import { Privilege } from './models/privilege.model';
import { RegisterSource } from './models/register-source.enum';
import { SchoolInquiryInfo } from './models/school-inquiry-info.model';
import { Status } from './models/status.model';
import { StayMode } from './models/stay-mode.model';
import { map, flatMap } from 'rxjs/operators';
import { SpecHealth } from './models/spec-health.model';
import { Child } from './models/child.model';
import { ConfirmationDocumentService } from './confirmation-document.service';
import { ParentInfo } from './models/parent-info.model';
import { ConfirmationDocument } from './models/confirmation-document.model';
import { CitizenshipService } from './citizenship.service';
import { LocationService } from './location.service';
import { AddressService } from './address.service';
import { AddressVm, Address } from './models/address.model';
import { PersonService } from './person.service';
import { Person } from './models/person.model';

@Injectable()
export class InquiryService {
  constructor(private commonService: CommonService, private dataSource: InquiryDataSourceService, private confirmationDocumentService: ConfirmationDocumentService,
    private citizenshipService: CitizenshipService, private locationService: LocationService, private addressService: AddressService,
    private personService:PersonService) { }

  saveApplicant(inquiry: InquiryRequest, editPersonComponent: EditPersonComponent, editCitizenshipsComponent: EditCitizenshipsComponent,
    editConfirmationDocumentComponent: EditConfirmationDocumentComponent): InquiryRequest {
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

  saveInquiryInfo(editInquiryInfoComponent: EditInquiryInfoComponent, update: (patch: object) => void): void {
    const inquiryInfo = (() => {
      const distributionParams = DistributionParams.constructFromForm(editInquiryInfoComponent.distributionParamsComponent.inquiryInfoForm);
      const stayMode = StayMode.constructFromForm(editInquiryInfoComponent.stayModeComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
      const ageGroup = AgeGroup.constructFromForm(editInquiryInfoComponent.ageGroupComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
      return new InquiryInfoRequest(distributionParams, stayMode, ageGroup);
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
    if (editInstitutionsComponent.inquiry.type == "school")
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
    const currentEducationPlace: FromPlace = (() => {
      const place = new FromPlace(editCurrentEducationPlaceComponent.currentPlaceForm.value["municipality"],
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
  create(inquiry: InquiryRequest): Observable<InquiryRequest> {
    if (!environment.production) {
      inquiry.id = Guid.newGuid();
      inquiry.version = new Date();
      inquiry.registerDateTime = new Date();
      inquiry.number = "46205/ЗЗ/18091213";
      inquiry.registerSource = RegisterSource.Ws;
      inquiry.addInformation = "доп. инфа по заявлению";
      inquiry.portalIdentity = new PortalIdentity(Guid.newGuid(), "123 внешний id");
      inquiry.status = new Status(Guid.newGuid(), "Новое");

      let request = new Inquiry();
      let parent: any = {};
      const hasParentRegisterAddress = inquiry.parent && inquiry.parent.register;
      const hasParentResidentialAddress = inquiry.parent && inquiry.parent.residential;
      Observable.create(() => {
        console.log("run inquiry create operation...............")
      }).pipe(flatMap(() => {
        if (inquiry.parent && inquiry.parent.countryStateDocument) {
          return this.confirmationDocumentService.create(inquiry.parent.countryStateDocument);
        }
        return empty();
      }), flatMap((countryStateDocument: ConfirmationDocument) => {
        if (countryStateDocument) {
          parent.countryStateDocumentId = countryStateDocument.id;
          console.log("parent.countryStateDocument created!")
        }
        if (inquiry.parent && inquiry.parent.parentRepresentChildrenDocument) {
          return this.confirmationDocumentService.create(inquiry.parent.parentRepresentChildrenDocument);
        }
        return empty();
      }), flatMap((parentRepresentChildrenDocument: ConfirmationDocument) => {
        if (parentRepresentChildrenDocument) {
          parent.parentRepresentChildrenDocument = parentRepresentChildrenDocument.id;
          console.log("parent.parentRepresentChildrenDocument created!")
        }
        if (hasParentRegisterAddress) {
          let observable = {
            region: this.locationService.create(inquiry.parent.register.region),
            district: this.locationService.create(inquiry.parent.register.district),
            city: this.locationService.create(inquiry.parent.register.city),
            street: this.locationService.create(inquiry.parent.register.street),
            building: this.locationService.create(inquiry.parent.register.building)
          }
          return zip(observable.region, observable.district, observable.city, observable.street, observable.building);
        }
        return empty();
      }),
        flatMap((locations) => {
          if (locations) {
            let address = AddressVm.build(locations[0], locations[1], locations[2], locations[3], locations[4], inquiry.parent.register.flat,
              inquiry.parent.register.additionalInfo, inquiry.parent.register.foreign);
            return this.addressService.create(address);
          }
          return empty();
        }),
        flatMap((address: Address) => {
          if (address) {
            parent.registerAddressId = address.id;
            console.log(`register address created!`);
          }
          if (hasParentResidentialAddress) {
            let observable = {
              region: this.locationService.create(inquiry.parent.residential.region),
              district: this.locationService.create(inquiry.parent.residential.district),
              city: this.locationService.create(inquiry.parent.residential.city),
              street: this.locationService.create(inquiry.parent.residential.street),
              building: this.locationService.create(inquiry.parent.residential.building)
            }
            return zip(observable.region, observable.district, observable.city, observable.street, observable.building);
          }
          return empty();
        }),
        flatMap((locations) => {
          if (locations) {
            let address = AddressVm.build(locations[0], locations[1], locations[2], locations[3], locations[4], inquiry.parent.residential.flat,
              inquiry.parent.residential.additionalInfo, inquiry.parent.residential.foreign);
            return this.addressService.create(address);
          }
          return empty();
        }),
        flatMap((address: Address) => {
          if (address) {
            parent.residentialId = address.id;
            console.log(`residential address created!`);
          }
          if(inquiry.parent){
            return this.personService.create(inquiry.parent);
          }
          return empty();
        }),
        flatMap((person:Person)=>{
          if(person){
            Object.assign(parent, person);
            console.log(`parent personalData created!`);
          }
          return empty();
        }))
        .subscribe(x => {
          if(inquiry.parent){
            parent.tempRegistrationExpiredDate = inquiry.parent.tempRegistrationExpiredDate;
            parent.registerAddressLikeAsResidentialAddress = inquiry.parent.registerAddressLikeAsResidentialAddress;
            parent.relationTypeId = inquiry.parent.relationType.id;
            request.parentInfoId = parent.id;
          }
          
        });

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
    }
    return empty();
    //return this.dataSource.post(inquiry);
  }

  update(id: string, inquiry: InquiryRequest): Observable<InquiryRequest> {
    return this.dataSource.put(id, inquiry);
  }

  get(id: string): Observable<InquiryRequest> {
    return this.dataSource.get(id).pipe(map(x => new InquiryRequest(x)));
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
  updateInquiry(inquiry: InquiryRequest, inquiryProp: { id: string }) {
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
