import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DateAdapter } from "@angular/material";
import { NgSelectModule } from "@ng-select/ng-select";
import { TextMaskModule } from "angular2-text-mask";
import { MaterialModule } from "./material.module";
import { EditCitizenshipsDialogComponent } from "./modules/inquiry/edit-citizenships-dialog/edit-citizenships-dialog.component";
import { EditConfirmationDocumentDialogComponent } from "./modules/inquiry/edit-confirmation-document-dialog/edit-confirmation-document-dialog.component";
import { EditChildrenComponent } from "./modules/inquiry/shared/components/edit-children/edit-children.component";
import { EditCitizenshipsComponent } from './modules/inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { EditContactInfoComponent } from "./modules/inquiry/shared/components/edit-contact-info/edit-contact-info.component";
import { EditCurrentEducationPlaceComponent } from "./modules/inquiry/shared/components/edit-current-education-place/edit-current-education-place.component";
import { EditFileAttachmentsComponent } from "./modules/inquiry/shared/components/edit-file-attachments/edit-file-attachments.component";
import { EditPreschoolInquiryInfoComponent } from "./modules/inquiry/shared/components/edit-preschool-inquiry-info/edit-preschool-inquiry-info.component";
import { EditInstitutionsComponent } from "./modules/inquiry/shared/components/edit-institutions/edit-institutions.component";
import { EditPersonComponent } from "./modules/inquiry/shared/components/edit-person/edit-person.component";
import { InquiryInfoEditComponent } from "./modules/inquiry/shared/components/inquiry-info-edit/inquiry-info-edit.component";
import { EducProgramService, InquiryService, SpecializationService, InstitutionService } from "./shared";
import { ApplicantTypePipe } from "./shared/applicant-type.pipe";
import { AreaTypePipe } from './shared/area-type.pipe';
import { AttachmentTypePipe } from "./shared/attachment-type.pipe";
import { AddressComponent } from "./shared/components/address/address.component";
import { AgeGroupComponent } from "./shared/components/age-group/age-group.component";
import { AtLeastOneCheckboxShouldBeSelectedComponent } from "./shared/components/at-least-one-checkbox-should-be-selected/at-least-one-checkbox-should-be-selected.component";
import { BirthInfoComponent } from "./shared/components/birth-info/birth-info.component";
import { ChildrenCardComponent } from './shared/components/children-card/children-card.component';
import { CitizenshipSelectComponent } from "./shared/components/citizenship-select/citizenship-select.component";
import { CitizenshipsCardComponent } from "./shared/components/citizenships-card/citizenships-card.component";
import { ConfirmationDocumentCardComponent } from "./shared/components/confirmation-document-card/confirmation-document-card.component";
import { ContactInfoCardComponent } from './shared/components/contact-info-card/contact-info-card.component';
import { CurrentEducationPlaceCardComponent } from "./shared/components/current-education-place-card/current-education-place-card.component";
import { DistributionParamsComponent } from "./shared/components/distribution-params/distribution-params.component";
import { EditConfirmationDocumentComponent } from "./shared/components/edit-confirmation-document/edit-confirmation-document.component";
import { EditSchoolInquiryInfoComponent } from './shared/components/edit-school-inquiry-info/edit-school-inquiry-info.component';
import { FilesCardComponent } from "./shared/components/files-card/files-card.component";
import { ForeignCitizensAddressesComponent } from "./shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component";
import { FullNameComponent } from "./shared/components/full-name/full-name.component";
import { GenderComponent } from "./shared/components/gender/gender.component";
import { IdentityCardComponent } from "./shared/components/identity-card/identity-card.component";
import { InstitutionsCardComponent } from "./shared/components/institutions-card/institutions-card.component";
import { PersonCardComponent } from "./shared/components/person-card/person-card.component";
import { PreschoolInquiryInfoCardComponent } from "./shared/components/preschool-inquiry-info-card/preschool-inquiry-info-card.component";
import { PrivilegeCardComponent } from "./shared/components/privilege-card/privilege-card.component";
import { EditPrivilegeComponent } from "./shared/components/edit-privilege/edit-privilege.component";
import { RelationTypeCardComponent } from './shared/components/relation-type-card/relation-type-card.component';
import { RelationTypeComponent } from "./shared/components/relation-type/relation-type.component";
import { RfCitizensAddressesComponent } from "./shared/components/rf-citizens-addresses/rf-citizens-addresses.component";
import { RoutingButtonsComponent } from "./shared/components/routing-buttons/routing-buttons.component";
import { SchoolClassCardComponent } from "./shared/components/school-classes-card/school-classes-card.component";
import { SchoolInquiryInfoCardComponent } from "./shared/components/school-inquiry-info-card/school-inquiry-info-card.component";
import { SnilsComponent } from "./shared/components/snils/snils.component";
import { SpecHealthComponent } from "./shared/components/spec-health/spec-health.component";
import { StayModeComponent } from "./shared/components/stay-mode/stay-mode.component";
import { ConfirmationDocumentService } from "./shared/confirmation-document.service";
import { FamilyInfoService } from "./shared/family-info.service";
import { InquiryTypeFriendlyNamePipe } from './shared/inquiry-type.pipe';
import { PersonService } from "./shared/person.service";
import { YesNoPipe } from "./shared/yes-no.pipe";
import { InstitutionDataSourceService } from "./shared/institution-data-source.service";
import { InquiryDataSourceService } from "./shared/inquiry-data-source.service";
import { DisabilityService } from "./shared/disability.service";
import { EditPetitionComponent } from "./modules/inquiry/shared/components/edit-petition/edit-petition.component";
import { PetitionTypePipe } from "./shared/petition-type.pipe";
import { DisabilityComponent } from './shared/components/disability/disability.component';
import { SpecHealthDataSourceService } from "./shared/spec-health-data-source.service";
import { SpecHealthCardComponent } from './shared/components/spec-health-card/spec-health-card.component';
import { EditSpecHealthComponent } from './shared/components/edit-spec-health/edit-spec-health.component';
import { ContactInfoService } from "./shared/contact-info.service";
import { ContactInfoDataSourceService } from "./shared/contact-info-data-source.service";
import { SchoolInquiryInfoDataSourceService } from "./shared/school-inquiry-info-data-source.service";
import { SchoolInquiryInfoService } from "./shared/school-inquiry-info.service";
import { InquiryInfoService } from "./inquiry-info.service";
import { InquiryInfoDataSourceService } from "./inquiry-info-data-source.service";
import { FileAttachmentDataSourceService } from "./shared/file-attachment-data-source.service";
import { FileAttachmentService } from "./shared/file-attachment.service";
import { PetitionDataSourceService } from "./shared/petition-data-source.service.";
import { PetitionService } from "./shared/petition.service.";



@NgModule({
    declarations: [
        EditPrivilegeComponent, EditConfirmationDocumentComponent, ApplicantTypePipe, AttachmentTypePipe, InquiryTypeFriendlyNamePipe, PetitionTypePipe, FullNameComponent, GenderComponent,
        SnilsComponent, IdentityCardComponent, CitizenshipSelectComponent, RfCitizensAddressesComponent, AddressComponent, ForeignCitizensAddressesComponent,
        BirthInfoComponent, RelationTypeComponent, EditPersonComponent, EditPreschoolInquiryInfoComponent, AtLeastOneCheckboxShouldBeSelectedComponent, EditInstitutionsComponent,

        InquiryInfoEditComponent, DistributionParamsComponent, StayModeComponent, AgeGroupComponent, //inquiryInfo params
        EditContactInfoComponent, EditCurrentEducationPlaceComponent, EditFileAttachmentsComponent, AreaTypePipe, EditSchoolInquiryInfoComponent, SchoolInquiryInfoCardComponent,
        PersonCardComponent, ConfirmationDocumentCardComponent, ChildrenCardComponent,
        PreschoolInquiryInfoCardComponent,
        ContactInfoCardComponent,
        InstitutionsCardComponent, SpecHealthComponent,
        SchoolClassCardComponent, EditChildrenComponent,
        CurrentEducationPlaceCardComponent, EditConfirmationDocumentDialogComponent,
        PrivilegeCardComponent,
        FilesCardComponent, YesNoPipe, CitizenshipsCardComponent,
        RoutingButtonsComponent, EditCitizenshipsDialogComponent, EditCitizenshipsComponent, RelationTypeCardComponent, DisabilityComponent, SpecHealthCardComponent, EditSpecHealthComponent, EditPetitionComponent

    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgSelectModule,

    ],
    exports: [
        EditPrivilegeComponent, EditConfirmationDocumentComponent, ApplicantTypePipe, AttachmentTypePipe, InquiryTypeFriendlyNamePipe, PetitionTypePipe, FullNameComponent, GenderComponent,
        SnilsComponent, IdentityCardComponent, CitizenshipSelectComponent, RfCitizensAddressesComponent, AddressComponent, ForeignCitizensAddressesComponent,
        BirthInfoComponent, RelationTypeComponent, EditPersonComponent, EditPreschoolInquiryInfoComponent, DistributionParamsComponent, StayModeComponent, AgeGroupComponent,
        InquiryInfoEditComponent, AtLeastOneCheckboxShouldBeSelectedComponent, EditInstitutionsComponent, EditContactInfoComponent, EditCurrentEducationPlaceComponent,
        EditFileAttachmentsComponent, EditSchoolInquiryInfoComponent, SchoolInquiryInfoCardComponent, PreschoolInquiryInfoCardComponent,
        PersonCardComponent, ConfirmationDocumentCardComponent, ChildrenCardComponent, ContactInfoCardComponent, SpecHealthComponent,
        InstitutionsCardComponent, SchoolClassCardComponent, CurrentEducationPlaceCardComponent, EditChildrenComponent,
        PrivilegeCardComponent, FilesCardComponent, YesNoPipe, RoutingButtonsComponent, EditCitizenshipsComponent, CitizenshipsCardComponent, RelationTypeCardComponent,
        DisabilityComponent, SpecHealthCardComponent, EditSpecHealthComponent, EditPetitionComponent
    ],
    providers: [
        SpecializationService, ConfirmationDocumentService, FamilyInfoService,
        EducProgramService, PersonService, InquiryDataSourceService, InquiryService, DisabilityService, SpecHealthDataSourceService,
        InstitutionService, InstitutionDataSourceService, ContactInfoService, ContactInfoDataSourceService,SchoolInquiryInfoDataSourceService, SchoolInquiryInfoService,        InquiryInfoService, InquiryInfoDataSourceService,
        InquiryInfoService, InquiryInfoDataSourceService, PetitionDataSourceService, PetitionService,
        FileAttachmentDataSourceService, FileAttachmentService
    ],
    entryComponents: [EditConfirmationDocumentDialogComponent, EditChildrenComponent, EditCitizenshipsDialogComponent]
})
export class ShareModule {
    constructor(dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale('ru-RU'); // DD/MM/YYYY
    }
}