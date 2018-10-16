import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { InMemoryService } from '../../in-memory-server';
import { MaterialModule } from '../../material.module';
import { ShareModule } from '../../share.module';
import { AddressService, AreaService, CitizenshipService, CommonService, DrawService, FormService, GroupService, IdentityCardService, InquiryService, InstitutionService, PrivilegeService, RelationTypeService, SettingsService, SpecHealthService, SpecificityService, StatusService } from '../../shared';
import { HttpInterceptor } from '../../shared/http-interceptor';
import { RegisterSourcePipe } from '../../shared/models/register-source.pipe';
import { PrivilegeOrderService } from '../../shared/privilege-order.service';
import { CurrentEducationPlaceStepService, WizardStorageService } from '../wizard/shared';
import { EditContactInfoDialogComponent } from './edit-contact-info-dialog/edit-contact-info-dialog.component';
import { EditFileAttachmentsDialogComponent } from './edit-file-attachments-dialog/edit-file-attachments-dialog.component';
import { EditInquiryInfoDialogComponent } from './edit-inquiry-info-dialog/edit-inquiry-info-dialog.component';
import { EditPersonDialogComponent } from './edit-person-dialog/edit-person-dialog.component';
import { EditPreschoolInstitutionDialogComponent } from './edit-preschool-institution-dialog/edit-preschool-institution-dialog.component';
import { EditPrivilegeDialogComponent } from './edit-privilege-dialog/edit-privilege-dialog.component';
import { InquiryReadComponent } from './inquiry-read/inquiry-read.component';
import { InquiryRouting } from './inquiry-routing-module';
import { InquiryCommonInfoComponent } from './shared/components/inquiry-common-info/inquiry-common-info.component';
import { EditCurrentEducationPlaceDialogComponent } from './edit-current-education-place-dialog/edit-current-education-place-dialog.component';
import { EditSchoolInquiryInfoDialogComponent } from './edit-school-inquiry-info-dialog/edit-school-inquiry-info-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    InquiryRouting,
    ShareModule,
    MyDatePickerModule,
    TextMaskModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    MaterialModule,
    //InMemoryWebApiModule.forRoot(InMemoryService)
  ],
  providers: [
    CurrentEducationPlaceStepService,

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
    StatusService
  ],
  declarations: [InquiryReadComponent, InquiryCommonInfoComponent, RegisterSourcePipe, EditPrivilegeDialogComponent, EditPersonDialogComponent, EditInquiryInfoDialogComponent, EditPreschoolInstitutionDialogComponent, EditContactInfoDialogComponent, EditCurrentEducationPlaceDialogComponent, EditFileAttachmentsDialogComponent, EditSchoolInquiryInfoDialogComponent],
  entryComponents: [EditPrivilegeDialogComponent, EditPersonDialogComponent, EditInquiryInfoDialogComponent, EditPreschoolInstitutionDialogComponent,
    EditContactInfoDialogComponent, EditCurrentEducationPlaceDialogComponent, EditFileAttachmentsDialogComponent,
    EditSchoolInquiryInfoDialogComponent]
})
export class InquiryModule { }
