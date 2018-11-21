import { Inject, Injectable, QueryList } from '@angular/core';
import { EditPersonComponent } from '../modules/inquiry/shared/components/edit-person/edit-person.component';
import { ApplicantType } from './applicant-type.enum';
import { CitizenshipService } from './citizenship.service';
import { EditConfirmationDocumentComponent } from './components/edit-confirmation-document/edit-confirmation-document.component';
import { Applicant } from './models/applicant.model';
import { AttachmentType } from './models/attachment-type.enum';
import { ConfirmationDocument } from './models/confirmation-document.model';
import { Entity } from './models/entity.model';
import { FileAttachment } from './models/file-attachment.model';
import { FileView } from './models/file-view.model';
import { FilesInfo } from './models/files-info.model';
import { IdentityCard } from './models/identityCard.model';
import { IdentityCardType } from './models/identityCardType';
import { Parent } from './models/parent.model';
import { esConstant } from '../app.module';
import { MatDialogConfig } from '@angular/material';
import { AddressComponent } from './components/address/address.component';
import { Address } from './models/address.model';
import { Guid } from './models/guid';

@Injectable()
export class CommonService {

  constructor(@Inject(esConstant) private esConstant, private citizenshipService: CitizenshipService) { }

  getAddressFromComponents(component: AddressComponent) {
    const data = component.$address.getValue();
    return data ? Address.build(data, false) : undefined;
  }
  getFiles(types: Array<AttachmentType>, filesInfo: FilesInfo) {
    let fileViewCollection = [];
    const requiredFiles: Array<FileView> = (() => {
      let result = [];
      const getDefaultViewView = (index: number, type: AttachmentType) => {
        return new FileView(this.esConstant.fileNotChoosen, index, new FileAttachment(type))
      }
      types.forEach((type, index) => {
        if (filesInfo) {
          let attachFileIndex = filesInfo.files.findIndex(file => file.attachmentType == type);
          if (attachFileIndex >= 0) {
            result.push(new FileView(filesInfo.files[attachFileIndex].name, index, filesInfo.files[attachFileIndex]));
          }
          else {
            result.push(getDefaultViewView(index, type));
          }
        }
        else {
          result.push(getDefaultViewView(index, type));
        }
      });
      return result;
    })();
    fileViewCollection = fileViewCollection.concat(requiredFiles);

    (() => {
      if (filesInfo) {
        const otherFiles = filesInfo.files.filter(file => file.attachmentType == AttachmentType.Other)
          .map((file, index) => {
            return new FileView(file.name, types.length + index, file);
          });
        fileViewCollection = fileViewCollection.concat(otherFiles);
      }
    })();
    return fileViewCollection;
  }

  pipeTransform<T extends number>(value: T | Array<T>, getName: (val: T) => string): Array<Entity<number>> | string {
    if (value.constructor == Array) {
      let result: Array<Entity<number>> = [];
      (<Array<T>>value).forEach(x => {
        result.push(new Entity<number>(x, getName(x)));
      });
      return result;
    } else {
      return getName(<T>value);
    }
  }

  autoCompliteFilter<T extends Entity<string>>(collection: Array<T>, name: string): Array<T> {
    const filterValue = name.toLowerCase();
    return collection.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(entity?: Entity<string>): string | undefined {
    return entity ? entity.name : undefined;
  }

  getIeVersion() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : undefined;
  }
  getDocumentByType(components: QueryList<EditConfirmationDocumentComponent> | Array<EditConfirmationDocumentComponent>, type: AttachmentType) {
    let component = components.find(x => x.type == type);
    if (!component) return undefined

    let document = ConfirmationDocument.construct(component.confirmationDocumentForm);
    document.id = component.model ? component.model.id : Guid.newGuid();
    return document;
  }
  compareObjects(o1: any, o2: any): boolean {
    return (o1 && o1.id) === (o2 && o2.id);
  }

  getParentDocumentTypes(): Array<IdentityCardType> {
    return [
      IdentityCardType["Паспорт РФ"],
      IdentityCardType["Другой документ, удостоверяющий личность"],
      IdentityCardType["Свидетельство о рождении РФ"],
      IdentityCardType["Загранпаспорт гражданина РФ"],
      IdentityCardType["Удостоверение офицера"],
      IdentityCardType["Военный билет"],
      IdentityCardType["Временное удостоверение, выданное взамен военного билета"],
      IdentityCardType["Временное удостоверение личности гражданина РФ"],
      IdentityCardType["Иностранный паспорт"],
      IdentityCardType["Удостоверение личности лица без гражданства в РФ"],
      IdentityCardType["Удостоверение личности отдельных категорий лиц, находящихся на территории РФ,подавших заявление о признании гражданами РФ или о приеме в гражданство РФ"],
      IdentityCardType["Удостоверение беженца"],
      IdentityCardType["Удостоверение личности лица, ходатайствующего о признании беженцем на территории РФ"],
      IdentityCardType["Удостоверение личности лица, получившего временное убежище на территории РФ"],
      IdentityCardType["Вид на жительство"],
      IdentityCardType["Разрешение на временное проживание в РФ"],
      IdentityCardType["Свидетельство о рассмотрении ходатайства о признании лица беженцем на территории РФ по существу"],
      IdentityCardType["Свидетельство о предоставлении временного убежища на территории Российской Федерации"],
      IdentityCardType["Свидетельство о рождении, выданное уполномоченным органом иностранного государства"]
    ];
  }

  buildParent(editParentComponent: EditPersonComponent, applicantType: ApplicantType) {
    // let birthInfo = (() => {
    //   if (!editParentComponent.birthInfoComponent) return {};
    //   return {
    //     birthDate: editParentComponent.birthInfoComponent.birthInfoForm.controls.birthDate.value,
    //     birthPlace: editParentComponent.birthInfoComponent.birthInfoForm.controls.birthPlace.value
    //   }
    // })();
    // let result = new Parent(editParentComponent.fullnameComponent.fullnameForm.controls.lastname.value,
    //   editParentComponent.fullnameComponent.fullnameForm.controls.firstname.value,
    //   editParentComponent.fullnameComponent.fullnameForm.controls.middlename.value,
    //   editParentComponent.snilsComponent.snils,
    //   editParentComponent.fullnameComponent.fullnameForm.controls.noMiddlename.value,
    //   birthInfo.birthDate,
    //   birthInfo.birthPlace, 1);
    // result.identityCard = new IdentityCard(editParentComponent.identityCardComponent.identityCardForm);
    // result.citizenships = editParentComponent.citizenshipSelectComponent.citizenships;

    // if (this.citizenshipService.hasForeignCitizenship(result.citizenships, editParentComponent.countries)) {
    //   result.countryStateDocument = this.getDocumentByType(editParentComponent.confirmationDocuments, AttachmentType.CountryStateDocument);
    // }

    // result.relationType = editParentComponent.relationTypeComponent.relationType;
    // if (result.relationType.confirmationDocument)
    //   result.parentRepresentChildrenDocument = this.getDocumentByType(editParentComponent.confirmationDocuments, AttachmentType.ParentRepresentChildren);

    // if (applicantType == ApplicantType.Parent) {
    //   Object.assign(result, this.citizenshipService.hasRfCitizenship(result.citizenships, editParentComponent.countries)
    //     ? editParentComponent.rfAddressesComponent.getResult()
    //     : editParentComponent.foreignAddressesComponent.getResult());
    // }
    // return result;
  }

  buildApplicant(editParentComponent: EditPersonComponent, applicantType: ApplicantType) {
    // let result = new Applicant(editParentComponent.fullnameComponent.fullnameForm.controls.lastname.value,
    //   editParentComponent.fullnameComponent.fullnameForm.controls.firstname.value,
    //   editParentComponent.fullnameComponent.fullnameForm.controls.middlename.value,
    //   editParentComponent.snilsComponent.snils,
    //   editParentComponent.fullnameComponent.fullnameForm.controls.noMiddlename.value,
    //   null, null, null);
    // result.identityCard = new IdentityCard(editParentComponent.identityCardComponent.identityCardForm);
    // result.citizenships = editParentComponent.citizenshipSelectComponent.citizenships;

    // if (this.citizenshipService.hasForeignCitizenship(result.citizenships, editParentComponent.countries)) {
    //   result.countryStateApplicantDocument = this.getDocumentByType(editParentComponent.confirmationDocuments, AttachmentType.CountryStateApplicantDocument);
    // }
    // result.applicantRepresentParentDocument = this.getDocumentByType(editParentComponent.confirmationDocuments, AttachmentType.ApplicantRepresentParent);

    // if (applicantType == ApplicantType.Applicant) {
    //   //--addresses
    //   Object.assign(result, this.citizenshipService.hasRfCitizenship(result.citizenships, editParentComponent.countries)
    //     ? editParentComponent.rfAddressesComponent.getResult()
    //     : editParentComponent.foreignAddressesComponent.getResult());
    //   //--
    //}

    //return result;
  }

  getDialogConfig(obj?: object) {
    let config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = false;
    config.width = "1000px";
    config.data = {};
    if (obj) Object.assign(config.data, obj);

    return config;
  }
}
