import { Pipe, PipeTransform } from '@angular/core';
import { AttachmentType } from './attachment-type.enum';

@Pipe({
  name: 'attachmentType'
})
export class AttachmentTypePipe implements PipeTransform {

  transform(value: AttachmentType, args?: any): any {
    switch (value) {
      case AttachmentType.Other:
        return "Другое";
      case AttachmentType.ParentIdentityCard:
        return "Копия документа, удостоверяющего личность законного представителя";
      case AttachmentType.ChildBirthdateCertificate:
        return "Копия свидетельства о рождении";
      case AttachmentType.PrivilegeProofDocument:
        return "Копия документа, подтверждающего льготу";
      case AttachmentType.ParentRepresentChildren:
        return "Копия документа, подтверждающего полномочие законного представителя представлять интересы ребенка";
      case AttachmentType.SpecHealthDocument:
        return "Копия документа, подтверждающего потребность ребенка в группе с ОВЗ";
      case AttachmentType.TemporaryRegisterDocument:
        return "Копия временной регистрации";
      case AttachmentType.ChildrenTemporaryRegisterDocument:
        return "";
      case AttachmentType.ApplicantRepresentParent:
        return "Документ, подтверждающий полномочие доверенного лица представлять интересы законного представителя ребенка";
      case AttachmentType.CountryStateDocument:
        return "Документ, подтверждающий право пребывания законного представителя на территории РФ";
      case AttachmentType.CountryStateApplicantDocument:
        return "Документ, подтверждающий право пребывания доверенного лица законного представителя на территории РФ";
      case AttachmentType.ApplicantIdentityCard:
        return "Копия документа, удостоверяющего личность доверенного лица законного представителя";
      default:
        break;
    }
  }

}
