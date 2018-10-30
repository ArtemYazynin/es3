import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { DateAdapter } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { MaterialModule } from '../../material.module';
import { ShareModule } from '../../share.module';
import { AddressService, AreaService, CitizenshipService, CommonService, DrawService, EnumToArrayPipe, FormService, GroupService, IdentityCardService, IdentityCardTypePipe, InquiryService, InstitutionService, PrivilegeOrderService, PrivilegeService, RelationTypeService, SettingsService, SpecHealthService, SpecificityService } from '../../shared';
import { ActionsButtonsService } from '../../shared/actions-buttons.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { HttpInterceptor } from '../../shared/http-interceptor';
import { RegisterCompleteResolver } from '../../shared/register-complete-resolver';
import { ApplicantStepComponent } from '../wizard/applicant-step/applicant-step.component';
import { ApplicantTypeStepComponent } from '../wizard/applicant-type-step/applicant-type-step.component';
import { ChildrenStepComponent } from '../wizard/children-step/children-step.component';
import { ContactInfoStepComponent } from '../wizard/contact-info-step/contact-info-step.component';
import { CurrentEducationPlaceStepComponent } from '../wizard/current-education-place-step/current-education-place-step.component';
import { FileAttachmentStepComponent } from '../wizard/file-attachment-step/file-attachment-step.component';
import { InquiryInfoStepComponent } from '../wizard/inquiry-info-step/inquiry-info-step.component';
import { ParentStepComponent } from '../wizard/parent-step/parent-step.component';
import { PreviewStepComponent } from '../wizard/preview-step/preview-step.component';
import { PrivilegeStepComponent } from '../wizard/privilege-step/privilege-step.component';
import { SchoolInquiryInfoStepComponent } from '../wizard/school-inquiry-info-step/school-inquiry-info-step.component';
import { CurrentEducationPlaceStepService } from '../wizard/shared/current-education-place-step.service';
import { InstitutionStepComponent } from './institution-step/institution-step.component';
import { PreviewFilesComponent } from './preview/preview-files/preview-files.component';
import { PreviewPrivilegeComponent } from './preview/preview-privilege/preview-privilege.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';
import { PrivilegeStepResolver } from './resolvers/privilege-step-resolver';
import { ParentStepService, WizardStorageService } from './shared';
import { WizardRoutingModule } from './wizard-routing-module';
import { ChildComponent } from './children-step/child/child.component';


@NgModule({
  declarations: [
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
    InstitutionStepComponent,
    FileAttachmentStepComponent,
    PreviewStepComponent,
    //end
    IdentityCardTypePipe,
    EnumToArrayPipe,
    ChildComponent,



    PreviewPrivilegeComponent,
    PreviewFilesComponent,
    ConfirmDialogComponent,
    RegisterCompleteComponent

  ],
  exports: [],
  imports: [
    CommonModule,
    WizardRoutingModule,
    ShareModule,
    MaterialModule,
    MyDatePickerModule,
    TextMaskModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    //InMemoryWebApiModule.forRoot(InMemoryService),
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
    InquiryService,
    ActionsButtonsService
  ],
  entryComponents: [ChildComponent, ConfirmDialogComponent], //динамически добавляемые компоненты ViewContainerRef.createComponent()
})
export class WizardModule {
  constructor(dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('ru-RU'); // DD/MM/YYYY
  }
}
