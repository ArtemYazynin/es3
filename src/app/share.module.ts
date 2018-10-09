import { CommonModule } from "@angular/common";
import { NgModule, InjectionToken } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { TextMaskModule } from "angular2-text-mask";
import { MaterialModule } from "./material.module";
import { EditContactInfoComponent } from "./modules/inquiry/shared/components/edit-contact-info/edit-contact-info.component";
import { EditCurrentEducationPlaceComponent } from "./modules/inquiry/shared/components/edit-current-education-place/edit-current-education-place.component";
import { EditFileAttachmentsComponent } from "./modules/inquiry/shared/components/edit-file-attachments/edit-file-attachments.component";
import { EditInquiryInfoComponent } from "./modules/inquiry/shared/components/edit-inquiry-info/edit-inquiry-info.component";
import { EditInstitutionsComponent } from "./modules/inquiry/shared/components/edit-institutions/edit-institutions.component";
import { EditPersonComponent } from "./modules/inquiry/shared/components/edit-person/edit-person.component";
import { InquiryInfoEditComponent } from "./modules/inquiry/shared/components/inquiry-info-edit/inquiry-info-edit.component";
import { ApplicantTypePipe } from "./shared/applicant-type.pipe";
import { AttachmentTypePipe } from "./shared/attachment-type.pipe";
import { AddressComponent } from "./shared/components/address/address.component";
import { AgeGroupComponent } from "./shared/components/age-group/age-group.component";
import { AtLeastOneCheckboxShouldBeSelectedComponent } from "./shared/components/at-least-one-checkbox-should-be-selected/at-least-one-checkbox-should-be-selected.component";
import { BirthInfoComponent } from "./shared/components/birth-info/birth-info.component";
import { CitizenshipSelectComponent } from "./shared/components/citizenship-select/citizenship-select.component";
import { ConfirmationDocumentComponent } from "./shared/components/confirmation-document/confirmation-document.component";
import { DistributionParamsComponent } from "./shared/components/distribution-params/distribution-params.component";
import { ForeignCitizensAddressesComponent } from "./shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component";
import { FullNameComponent } from "./shared/components/full-name/full-name.component";
import { GenderComponent } from "./shared/components/gender/gender.component";
import { IdentityCardComponent } from "./shared/components/identity-card/identity-card.component";
import { PrivilegeEditComponent } from "./shared/components/privilege-edit/privilege-edit.component";
import { RelationTypeComponent } from "./shared/components/relation-type/relation-type.component";
import { RfCitizensAddressesComponent } from "./shared/components/rf-citizens-addresses/rf-citizens-addresses.component";
import { SnilsComponent } from "./shared/components/snils/snils.component";
import { StayModeComponent } from "./shared/components/stay-mode/stay-mode.component";
import { InquiryTypeFriendlyNamePipe } from './shared/inquiry-type.pipe';
import { AreaTypePipe } from './shared/area-type.pipe';
import { EditSchoolInquiryInfoComponent } from './shared/components/edit-school-inquiry-info/edit-school-inquiry-info.component';
import { PreviewSchoolInquiryInfoComponent } from "./modules/wizard/preview/preview-school-inquiry-info/preview-school-inquiry-info.component";
import { SpecializationService, EducProgramService } from "./shared";
import { PersonViewComponent } from "./shared/components/person-view/person-view.component";
import { ConfirmationDocumentViewComponent } from "./shared/components/confirmation-document-view/confirmation-document-view.component";
import { AdultCardComponent } from './shared/components/adult-card/adult-card.component';
import { ChildrenCardComponent } from './shared/components/children-card/children-card.component';
import { PreviewPreschoolInquiryInfoComponent } from "./modules/wizard/preview/preview-preschool-inquiry-info/preview-preschool-inquiry-info.component";



@NgModule({
    declarations: [
        PrivilegeEditComponent, ConfirmationDocumentComponent, ApplicantTypePipe, AttachmentTypePipe, InquiryTypeFriendlyNamePipe, FullNameComponent, GenderComponent,
        SnilsComponent, IdentityCardComponent, CitizenshipSelectComponent, RfCitizensAddressesComponent, AddressComponent, ForeignCitizensAddressesComponent,
        BirthInfoComponent, RelationTypeComponent, EditPersonComponent, EditInquiryInfoComponent, AtLeastOneCheckboxShouldBeSelectedComponent, EditInstitutionsComponent,

        InquiryInfoEditComponent, DistributionParamsComponent, StayModeComponent, AgeGroupComponent, //inquiryInfo params
        EditContactInfoComponent, EditCurrentEducationPlaceComponent, EditFileAttachmentsComponent, AreaTypePipe, EditSchoolInquiryInfoComponent, PreviewSchoolInquiryInfoComponent,
        PersonViewComponent, ConfirmationDocumentViewComponent, AdultCardComponent, ChildrenCardComponent,
        PreviewPreschoolInquiryInfoComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgSelectModule
    ],
    exports: [
        PrivilegeEditComponent, ConfirmationDocumentComponent, ApplicantTypePipe, AttachmentTypePipe, InquiryTypeFriendlyNamePipe, FullNameComponent, GenderComponent,
        SnilsComponent, IdentityCardComponent, CitizenshipSelectComponent, RfCitizensAddressesComponent, AddressComponent, ForeignCitizensAddressesComponent,
        BirthInfoComponent, RelationTypeComponent, EditPersonComponent, EditInquiryInfoComponent, DistributionParamsComponent, StayModeComponent, AgeGroupComponent,
        InquiryInfoEditComponent, AtLeastOneCheckboxShouldBeSelectedComponent, EditInstitutionsComponent, EditContactInfoComponent, EditCurrentEducationPlaceComponent,
        EditFileAttachmentsComponent, EditSchoolInquiryInfoComponent, PreviewSchoolInquiryInfoComponent,PreviewPreschoolInquiryInfoComponent,
        PersonViewComponent, ConfirmationDocumentViewComponent, AdultCardComponent, ChildrenCardComponent
    ],
    providers: [
        SpecializationService,
        EducProgramService
    ]
})
export class ShareModule {

}