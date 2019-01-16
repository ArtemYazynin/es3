import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { MaterialModule } from '../../material.module';
import { ShareModule } from '../../share.module';
import { AddressService, AreaService, CitizenshipService, CommonService, DrawService, FormService, GroupService, IdentityCardService, PrivilegeService, RelationTypeService, SettingsService, SpecHealthService, SpecificityService } from '../../shared';
import { ActionsButtonsService } from '../../shared/actions-buttons.service';
import { RegisterSourcePipe } from '../../shared/models/register-source.pipe';
import { PetitionTypePipe } from '../../shared/petition-type.pipe';
import { PrivilegeOrderService } from '../../shared/privilege-order.service';
import { WizardStorageService } from '../wizard/shared/wizard-storage.service';
import { ContactInfoDialogComponent } from './contact-info-dialog/contact-info-dialog.component';
import { DialogButtonsComponent } from './dialog-buttons/dialog-buttons.component';
import { EditCitizenshipsDialogComponent } from './edit-citizenships-dialog/edit-citizenships-dialog.component';
import { EditConfirmationDocumentDialogComponent } from './edit-confirmation-document-dialog/edit-confirmation-document-dialog.component';
import { EditCurrentEducationPlaceDialogComponent } from './edit-current-education-place-dialog/edit-current-education-place-dialog.component';
import { EditFileAttachmentsDialogComponent } from './edit-file-attachments-dialog/edit-file-attachments-dialog.component';
import { EditPersonDialogComponent } from './edit-person-dialog/edit-person-dialog.component';
import { EditPetitionDialogComponent } from './edit-petition-dialog/edit-petition-dialog.component';
import { EditInstitutionDialogComponent } from './edit-preschool-institution-dialog/edit-preschool-institution-dialog.component';
import { InquiryRouting } from './inquiry-routing-module';
import { PreschoolInquiryInfoDialogComponent } from './preschool-inquiry-info-dialog/preschool-inquiry-info-dialog.component';
import { PrivilegeDialogComponent } from './privilege-dialog/privilege-dialog.component';
import { RelationTypeDialogComponent } from './relation-type-dialog/relation-type-dialog.component';
import { SchoolInquiryInfoDialogComponent } from './school-inquiry-info-dialog/school-inquiry-info-dialog.component';
import { EditPetitionComponent } from './shared/components/edit-petition/edit-petition.component';
import { SpecHealthDialogComponent } from './spec-health-dialog/spec-health-dialog.component';

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
    MaterialModule,
    //InMemoryWebApiModule.forRoot(InMemoryService)
  ],
  providers: [
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
  declarations: [RegisterSourcePipe,
    PrivilegeDialogComponent, EditPersonDialogComponent, PreschoolInquiryInfoDialogComponent, EditInstitutionDialogComponent,
    ContactInfoDialogComponent, EditCurrentEducationPlaceDialogComponent, SchoolInquiryInfoDialogComponent, DialogButtonsComponent,
    EditPetitionDialogComponent, PetitionTypePipe, RelationTypeDialogComponent, SpecHealthDialogComponent, EditPetitionComponent,
    EditConfirmationDocumentDialogComponent, EditCitizenshipsDialogComponent, EditFileAttachmentsDialogComponent
  ],
  entryComponents: [PrivilegeDialogComponent, EditPersonDialogComponent, PreschoolInquiryInfoDialogComponent, EditInstitutionDialogComponent,
    ContactInfoDialogComponent, EditCurrentEducationPlaceDialogComponent, EditConfirmationDocumentDialogComponent, EditCitizenshipsDialogComponent,
    EditFileAttachmentsDialogComponent, SchoolInquiryInfoDialogComponent, EditPetitionDialogComponent, RelationTypeDialogComponent, SpecHealthDialogComponent]
})
export class InquiryModule { }
