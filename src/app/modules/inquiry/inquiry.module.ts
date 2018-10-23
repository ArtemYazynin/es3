import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { MaterialModule } from '../../material.module';
import { ShareModule } from '../../share.module';
import { AddressService, AreaService, CitizenshipService, CommonService, DrawService, FormService, GroupService, IdentityCardService, InquiryService, InstitutionService, PrivilegeService, RelationTypeService, SettingsService, SpecHealthService, SpecificityService, StatusService } from '../../shared';
import { CitizenshipsCardComponent } from '../../shared/components/citizenships-card/citizenships-card.component';
import { HttpInterceptor } from '../../shared/http-interceptor';
import { RegisterSourcePipe } from '../../shared/models/register-source.pipe';
import { PrivilegeOrderService } from '../../shared/privilege-order.service';
import { CurrentEducationPlaceStepService, WizardStorageService } from '../wizard/shared';
import { EditChildrenDialogComponent } from './edit-children-dialog/edit-children-dialog.component';
import { EditContactInfoDialogComponent } from './edit-contact-info-dialog/edit-contact-info-dialog.component';
import { EditCurrentEducationPlaceDialogComponent } from './edit-current-education-place-dialog/edit-current-education-place-dialog.component';
import { EditFileAttachmentsDialogComponent } from './edit-file-attachments-dialog/edit-file-attachments-dialog.component';
import { EditInquiryInfoDialogComponent } from './edit-inquiry-info-dialog/edit-inquiry-info-dialog.component';
import { EditPersonDialogComponent } from './edit-person-dialog/edit-person-dialog.component';
import { EditPetitionDialogComponent } from './edit-petition-dialog/edit-petition-dialog.component';
import { EditPreschoolInstitutionDialogComponent } from './edit-preschool-institution-dialog/edit-preschool-institution-dialog.component';
import { EditPrivilegeDialogComponent } from './edit-privilege-dialog/edit-privilege-dialog.component';
import { EditSchoolInquiryInfoDialogComponent } from './edit-school-inquiry-info-dialog/edit-school-inquiry-info-dialog.component';
import { InquiryReadComponent } from './inquiry-read/inquiry-read.component';
import { InquiryRouting } from './inquiry-routing-module';
import { InquiryCommonInfoComponent } from './shared/components/inquiry-common-info/inquiry-common-info.component';
import { PetitionCardComponent } from '../../shared/components/petition-card/petition-card.component';
import { PetitionTypePipe } from '../../shared/petition-type.pipe';

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
  declarations: [ PetitionCardComponent, InquiryReadComponent, CitizenshipsCardComponent, InquiryCommonInfoComponent, RegisterSourcePipe,
    EditPrivilegeDialogComponent, EditPersonDialogComponent, EditInquiryInfoDialogComponent, EditPreschoolInstitutionDialogComponent, 
    EditContactInfoDialogComponent, EditCurrentEducationPlaceDialogComponent, EditSchoolInquiryInfoDialogComponent,
    EditFileAttachmentsDialogComponent, EditChildrenDialogComponent, EditPetitionDialogComponent,PetitionTypePipe
  ],
  entryComponents: [EditPrivilegeDialogComponent, EditPersonDialogComponent, EditInquiryInfoDialogComponent, EditPreschoolInstitutionDialogComponent,
    EditContactInfoDialogComponent, EditCurrentEducationPlaceDialogComponent,
    EditSchoolInquiryInfoDialogComponent, EditPetitionDialogComponent]
})
export class InquiryModule { }
