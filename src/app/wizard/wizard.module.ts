import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { DateAdapter } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { NgSelectModule } from '@ng-select/ng-select';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { AppComponent } from '../app.component';
import { routes } from '../app.routes';
import { ConfirmationDocumentComponent } from '../confirmation-document/confirmation-document.component';
import { InMemoryService } from '../in-memory-server';
import { MaterialModule } from '../material.module';
import { BirthInfoComponent } from '../person/birth-info/birth-info.component';
import { CitizenshipSelectComponent } from '../person/citizenship-select/citizenship-select.component';
import { FullNameComponent } from '../person/full-name/full-name.component';
import { GenderComponent } from '../person/gender/gender.component';
import { IdentityCardComponent } from '../person/identity-card/identity-card.component';
import { IdentityCardTypePipe } from '../person/identity-card/shared/identity-card-type.pipe';
import { SnilsComponent } from '../person/snils/snils.component';
import { RelationTypeComponent } from '../relation-type/relation-type.component';
import { AreaService, CitizenshipService, CommonService, DrawService, EnumToArrayPipe, FormService, GroupService, IdentityCardService, InstitutionService, ParentStepService, PrivilegeOrderService, PrivilegeService, RelationTypeService, SettingsService, SpecHealthService, SpecificityService, WizardStorageService } from '../shared';
import { AddressService } from '../shared/address.service';
import { AddressComponent } from '../shared/address/address.component';
import { AgeGroupComponent } from '../shared/age-group/age-group.component';
import { AtLeastOneCheckboxShouldBeSelectedComponent } from '../shared/at-least-one-checkbox-should-be-selected/at-least-one-checkbox-should-be-selected.component';
import { AttachmentTypePipe } from '../shared/attachment-type.pipe';
import { DistributionParamsComponent } from '../shared/distribution-params/distribution-params.component';
import { HttpInterceptor } from '../shared/http-interceptor';
import { StayModeComponent } from '../shared/stay-mode/stay-mode.component';
import { SpecHealthComponent } from '../spec-health/spec-health.component';
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
import { PersonViewComponent } from '../wizard/preview/person-view/person-view.component';
import { PrivilegeStepComponent } from '../wizard/privilege-step/privilege-step.component';
import { SchoolInquiryInfoStepComponent } from '../wizard/school-inquiry-info-step/school-inquiry-info-step.component';
import { CurrentEducationPlaceStepService } from '../wizard/shared/current-education-place-step.service';
import { PrivilegeStepResolver } from './resolvers/privilege-step-resolver';
import { BaseResolver } from './resolvers/base-resolver';
import { PreviewInquiryInfoComponent } from './preview/preview-inquiry-info/preview-inquiry-info.component';
import { PreviewCurrentEducationPlaceComponent } from './preview/preview-current-education-place/preview-current-education-place.component';
import { PreviewPrivilegeComponent } from './preview/preview-privilege/preview-privilege.component';


@NgModule({
  declarations: [
    AppComponent,
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
    IdentityCardTypePipe,
    EnumToArrayPipe,
    AttachmentTypePipe,
    IdentityCardComponent,
    ConfirmationDocumentComponent,

    FullNameComponent,
    BirthInfoComponent,

    CitizenshipSelectComponent,
    ChildComponent,
    SnilsComponent,
    SpecHealthComponent,

    RelationTypeComponent,

    DistributionParamsComponent,
    StayModeComponent,
    AgeGroupComponent,
    AtLeastOneCheckboxShouldBeSelectedComponent,
    PreviewInquiryInfoComponent,
    PreviewCurrentEducationPlaceComponent,
    PreviewPrivilegeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    MyDatePickerModule,
    TextMaskModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    JsonpModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryService),
  ],
  providers: [
    BaseResolver,
    PrivilegeStepResolver,
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
    AddressService
  ],
  entryComponents: [ChildComponent],//динамически добавляемые компоненты ViewContainerRef.createComponent()
  bootstrap: []
})
export class WizardModule {

}
