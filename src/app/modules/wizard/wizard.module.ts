import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { MaterialModule } from '../../material.module';
import { ShareModule } from '../../share.module';
import { AddressService, AreaService, CitizenshipService, CommonService, DrawService, EnumToArrayPipe, FormService, GroupService, IdentityCardService, IdentityCardTypePipe, PrivilegeOrderService, PrivilegeService, RelationTypeService, SettingsService, SpecHealthService, SpecificityService } from '../../shared';
import { ActionsButtonsService } from '../../shared/actions-buttons.service';
import { RegisterCompleteResolver } from '../../shared/register-complete-resolver';
import { ApplicantStepComponent } from '../wizard/applicant-step/applicant-step.component';
import { ApplicantTypeStepComponent } from '../wizard/applicant-type-step/applicant-type-step.component';
import { ChildrenStepComponent } from '../wizard/children-step/children-step.component';
import { ContactInfoStepComponent } from '../wizard/contact-info-step/contact-info-step.component';
import { CurrentEducationPlaceStepComponent } from '../wizard/current-education-place-step/current-education-place-step.component';
import { FileAttachmentStepComponent } from '../wizard/file-attachment-step/file-attachment-step.component';
import { ParentStepComponent } from '../wizard/parent-step/parent-step.component';
import { PreschoolInquiryInfoStepComponent } from '../wizard/preschool-inquiry-info-step/preschool-inquiry-info-step.component';
import { PrivilegeStepComponent } from '../wizard/privilege-step/privilege-step.component';
import { SchoolInquiryInfoStepComponent } from '../wizard/school-inquiry-info-step/school-inquiry-info-step.component';
import { ChildComponent } from './children-step/child/child.component';
import { InstitutionStepComponent } from './institution-step/institution-step.component';
import { PreviewFilesComponent } from './preview/preview-files/preview-files.component';
import { PreviewPrivilegeComponent } from './preview/preview-privilege/preview-privilege.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';
import { ParentStepService, WizardStorageService } from './shared';
import { WizardRoutingModule } from './wizard-routing-module';
import { StepComponent } from './step/step.component';

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
    PreschoolInquiryInfoStepComponent,
    SchoolInquiryInfoStepComponent,
    InstitutionStepComponent,
    FileAttachmentStepComponent,
    //end
    IdentityCardTypePipe,
    EnumToArrayPipe,
    ChildComponent,
    PreviewPrivilegeComponent,
    PreviewFilesComponent,
    RegisterCompleteComponent,
    StepComponent
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
    //InMemoryWebApiModule.forRoot(InMemoryService),
  ],
  providers: [
    RegisterCompleteResolver,
    ParentStepService,
    FormService,
    WizardStorageService,
    CitizenshipService,
    RelationTypeService,
    IdentityCardService,
    SpecHealthService,
    AreaService,
    GroupService,
    CommonService,
    PrivilegeOrderService,
    PrivilegeService,
    SpecificityService,
    SettingsService,
    DrawService,
    AddressService,
    ActionsButtonsService
  ],
  entryComponents: [ChildComponent], //динамически добавляемые компоненты ViewContainerRef.createComponent()
})
export class WizardModule { }
