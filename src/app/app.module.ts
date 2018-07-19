import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { IdentityCardComponent } from './person/identity-card/identity-card.component';
import { ConfirmationDocumentComponent } from './confirmation-document/confirmation-document.component';
import { ApplicantTypeStepComponent } from './wizard/applicant-type-step/applicant-type-step.component';
import { ParentStepComponent } from './wizard/parent-step/parent-step.component';

import { HttpClientModule } from '@angular/common/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryService } from './in-memory-server';
import { HttpInterceptor } from './shared/http-interceptor';
import { FullNameComponent } from './person/full-name/full-name.component';
import { BirthInfoComponent } from './person/birth-info/birth-info.component';
import { ApplicantStepComponent } from './wizard/applicant-step/applicant-step.component';
import { ChildrenStepComponent } from './wizard/children-step/children-step.component';
import { EnumToArrayPipe, IdentityCardTypeFriendlyNamePipe, FormService, WizardStorageService, CitizenshipService, RelationTypeService, IdentityCardService, ParentStepService, SpecHealthService, AreaService, InstitutionService, GroupService, CommonService, PrivilegeOrderService, PrivilegeService, SpecificityService, SettingsService } from './shared/index';
import { MyDatePickerModule } from 'mydatepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { CitizenshipSelectComponent } from './person/citizenship-select/citizenship-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChildComponent } from './wizard/children-step/child/child.component';
import { SnilsComponent } from './person/snils/snils.component';
import { SpecHealthComponent } from './spec-health/spec-health.component';
import { CurrentEducationPlaceStepComponent } from './wizard/current-education-place-step/current-education-place-step.component';


import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  DateAdapter,
} from '@angular/material';
import { CurrentEducationPlaceStepService } from './wizard/shared/current-education-place-step.service';
import { AttachmentTypePipe } from './shared/attachment-type.pipe';
import { RelationTypeComponent } from './relation-type/relation-type.component';
import { ContactInfoStepComponent } from './wizard/contact-info-step/contact-info-step.component';
import { PrivilegeStepComponent } from './wizard/privilege-step/privilege-step.component';
import { InquiryInfoStepComponent } from './wizard/inquiry-info-step/inquiry-info-step.component';
import { DistributionParamsComponent } from './shared/distribution-params/distribution-params.component';
import { StayModeComponent } from './shared/stay-mode/stay-mode.component';
import { AgeGroupComponent } from './shared/age-group/age-group.component';
import { AtLeastOneCheckboxShouldBeSelectedComponent } from './shared/at-least-one-checkbox-should-be-selected/at-least-one-checkbox-should-be-selected.component';
import { SchoolInquiryInfoStepComponent } from './wizard/school-inquiry-info-step/school-inquiry-info-step.component';
import { PreschoolInstitutionStepComponent } from './wizard/preschool-institution-step/preschool-institution-step.component';
import { FileAttachmentStepComponent } from './wizard/file-attachment-step/file-attachment-step.component';
@NgModule({
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,

    // Material
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  declarations: []
})
export class MaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    EnumToArrayPipe,
    IdentityCardTypeFriendlyNamePipe,
    AttachmentTypePipe,
    IdentityCardComponent,
    ConfirmationDocumentComponent,
    ApplicantTypeStepComponent,
    ParentStepComponent,
    FullNameComponent,
    BirthInfoComponent,
    ApplicantStepComponent,
    ChildrenStepComponent,
    CitizenshipSelectComponent,
    ChildComponent,
    SnilsComponent,
    SpecHealthComponent,
    CurrentEducationPlaceStepComponent,
    RelationTypeComponent,
    ContactInfoStepComponent,
    PrivilegeStepComponent,
    InquiryInfoStepComponent,
    DistributionParamsComponent,
    StayModeComponent,
    AgeGroupComponent,
    AtLeastOneCheckboxShouldBeSelectedComponent,
    SchoolInquiryInfoStepComponent,
    PreschoolInstitutionStepComponent,
    FileAttachmentStepComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    MyDatePickerModule,
    TextMaskModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryService),
  ],
  providers: [
    HttpInterceptor,
    FormService,
    WizardStorageService,
    CitizenshipService,
    RelationTypeService,
    IdentityCardService,
    ParentStepService,
    SpecHealthService,
    AreaService,
    InstitutionService,
    GroupService,
    CurrentEducationPlaceStepService,
    CommonService,
    PrivilegeOrderService,
    PrivilegeService,
    SpecificityService,
    SettingsService
  ],
  entryComponents: [ChildComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(dateAdapter:DateAdapter<Date>) {
    dateAdapter.setLocale('ru-RU'); // DD/MM/YYYY
	}
}
