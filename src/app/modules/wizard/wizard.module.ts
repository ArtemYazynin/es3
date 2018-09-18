import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { NgSelectModule } from '@ng-select/ng-select';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { InMemoryService } from '../../in-memory-server';
import { MaterialModule } from '../../material.module';
import { ShareModule } from '../../share.module';
import { AddressService, AreaService, AttachmentTypePipe, CitizenshipService, CommonService, DrawService, EnumToArrayPipe, FormService, GroupService, IdentityCardService, IdentityCardTypePipe, InquiryService, InstitutionService, PrivilegeOrderService, PrivilegeService, RelationTypeService, SettingsService, SpecHealthService, SpecificityService } from '../../shared';
import { AddressComponent } from '../../shared/components/address/address.component';
import { AgeGroupComponent } from '../../shared/components/age-group/age-group.component';
import { AtLeastOneCheckboxShouldBeSelectedComponent } from '../../shared/components/at-least-one-checkbox-should-be-selected/at-least-one-checkbox-should-be-selected.component';
import { BirthInfoComponent } from '../../shared/components/birth-info/birth-info.component';
import { CitizenshipSelectComponent } from '../../shared/components/citizenship-select/citizenship-select.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { DisabilityChildComponent } from '../../shared/components/disability-child/disability-child.component';
import { DistributionParamsComponent } from '../../shared/components/distribution-params/distribution-params.component';
import { ForeignCitizensAddressesComponent } from '../../shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component';
import { FullNameComponent } from '../../shared/components/full-name/full-name.component';
import { GenderComponent } from '../../shared/components/gender/gender.component';
import { IdentityCardComponent } from '../../shared/components/identity-card/identity-card.component';
import { RelationTypeComponent } from '../../shared/components/relation-type/relation-type.component';
import { RfCitizensAddressesComponent } from '../../shared/components/rf-citizens-addresses/rf-citizens-addresses.component';
import { SnilsComponent } from '../../shared/components/snils/snils.component';
import { SpecHealthComponent } from '../../shared/components/spec-health/spec-health.component';
import { StayModeComponent } from '../../shared/components/stay-mode/stay-mode.component';
import { HttpInterceptor } from '../../shared/http-interceptor';
import { RegisterCompleteResolver } from '../../shared/register-complete-resolver';
import { YesNoPipe } from '../../shared/yes-no.pipe';
import { ApplicantStepComponent } from '../wizard/applicant-step/applicant-step.component';
import { ApplicantTypeStepComponent } from '../wizard/applicant-type-step/applicant-type-step.component';
import { ChildComponent } from '../wizard/children-step/child/child.component';
import { ChildrenStepComponent } from '../wizard/children-step/children-step.component';
import { ContactInfoStepComponent } from '../wizard/contact-info-step/contact-info-step.component';
import { CurrentEducationPlaceStepComponent } from '../wizard/current-education-place-step/current-education-place-step.component';
import { FileAttachmentStepComponent } from '../wizard/file-attachment-step/file-attachment-step.component';
import { InquiryInfoStepComponent } from '../wizard/inquiry-info-step/inquiry-info-step.component';
import { ParentStepComponent } from '../wizard/parent-step/parent-step.component';
import { PreschoolInstitutionStepComponent } from '../wizard/preschool-institution-step/preschool-institution-step.component';
import { PreviewStepComponent } from '../wizard/preview-step/preview-step.component';
import { ConfirmationDocumentViewComponent } from '../wizard/preview/confirmation-document-view/confirmation-document-view.component';
import { PrivilegeStepComponent } from '../wizard/privilege-step/privilege-step.component';
import { SchoolInquiryInfoStepComponent } from '../wizard/school-inquiry-info-step/school-inquiry-info-step.component';
import { CurrentEducationPlaceStepService } from '../wizard/shared/current-education-place-step.service';
import { PersonViewComponent } from './preview/person-view/person-view.component';
import { PreviewCurrentEducationPlaceComponent } from './preview/preview-current-education-place/preview-current-education-place.component';
import { PreviewFilesComponent } from './preview/preview-files/preview-files.component';
import { PreviewInquiryInfoComponent } from './preview/preview-inquiry-info/preview-inquiry-info.component';
import { PreviewPrivilegeComponent } from './preview/preview-privilege/preview-privilege.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';
import { PrivilegeStepResolver } from './resolvers/privilege-step-resolver';
import { ParentStepService, WizardStorageService } from './shared';
import { wizardRoutes } from './wizard-routes';



@NgModule({
  declarations: [
    //view components//
    ConfirmationDocumentViewComponent,
    PersonViewComponent,
    //end//
    //steps components
    ApplicantTypeStepComponent,
    ParentStepComponent,
    ApplicantStepComponent,
    ChildrenStepComponent,
    CurrentEducationPlaceStepComponent,
    ContactInfoStepComponent,
    PrivilegeStepComponent,
    InquiryInfoStepComponent,
    SchoolInquiryInfoStepComponent,
    PreschoolInstitutionStepComponent,
    FileAttachmentStepComponent,
    PreviewStepComponent,
    //end
    AddressComponent,
    GenderComponent,
    YesNoPipe,
    IdentityCardTypePipe,
    EnumToArrayPipe,
    AttachmentTypePipe,
    IdentityCardComponent,

    FullNameComponent,
    BirthInfoComponent,

    CitizenshipSelectComponent,
    ChildComponent,
    SnilsComponent,
    DisabilityChildComponent,
    SpecHealthComponent,

    RelationTypeComponent,

    DistributionParamsComponent,
    StayModeComponent,
    AgeGroupComponent,
    AtLeastOneCheckboxShouldBeSelectedComponent,
    PreviewInquiryInfoComponent,
    PreviewCurrentEducationPlaceComponent,
    PreviewPrivilegeComponent,
    PreviewFilesComponent,
    RfCitizensAddressesComponent,
    ForeignCitizensAddressesComponent,
    ConfirmDialogComponent,
    RegisterCompleteComponent,

  ],
  exports: [],
  imports: [
    BrowserModule,
    ShareModule,
    MaterialModule,
    MyDatePickerModule,
    TextMaskModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(wizardRoutes),
    HttpModule,
    JsonpModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryService),
  ],
  providers: [
    PrivilegeStepResolver,
    RegisterCompleteResolver,
    //wizard services
    ParentStepService,
    CurrentEducationPlaceStepService,
    //end
    HttpInterceptor,
    FormService,
    WizardStorageService,
    CitizenshipService,
    RelationTypeService,
    IdentityCardService,
    SpecHealthService,
    AreaService,
    InstitutionService,
    GroupService,
    CommonService,
    PrivilegeOrderService,
    PrivilegeService,
    SpecificityService,
    SettingsService,
    DrawService,
    AddressService,
    InquiryService
  ],
  entryComponents: [ChildComponent, ConfirmDialogComponent], //динамически добавляемые компоненты ViewContainerRef.createComponent()
})
export class WizardModule {

}
