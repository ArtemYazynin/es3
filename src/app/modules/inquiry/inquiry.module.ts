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
import { AddressService, AreaService, CitizenshipService, CommonService, DrawService, FormService, GroupService, IdentityCardService, PrivilegeService, RelationTypeService, SettingsService, SpecHealthService, SpecificityService, StatusService } from '../../shared';
import { ActionsButtonsService } from '../../shared/actions-buttons.service';
import { PetitionCardComponent } from '../../shared/components/petition-card/petition-card.component';
import { HttpInterceptor } from '../../shared/http-interceptor';
import { RegisterSourcePipe } from '../../shared/models/register-source.pipe';
import { PetitionTypePipe } from '../../shared/petition-type.pipe';
import { PrivilegeOrderService } from '../../shared/privilege-order.service';
import { ContactInfoDialogComponent } from './contact-info-dialog/contact-info-dialog.component';
import { EditChildrenDialogComponent } from './edit-children-dialog/edit-children-dialog.component';
import { EditCurrentEducationPlaceDialogComponent } from './edit-current-education-place-dialog/edit-current-education-place-dialog.component';
import { EditPersonDialogComponent } from './edit-person-dialog/edit-person-dialog.component';
import { EditPetitionDialogComponent } from './edit-petition-dialog/edit-petition-dialog.component';
import { EditPreschoolInstitutionDialogComponent } from './edit-preschool-institution-dialog/edit-preschool-institution-dialog.component';
import { InquiryReadComponent } from './inquiry-read/inquiry-read.component';
import { InquiryRouting } from './inquiry-routing-module';
import { PreschoolInquiryInfoDialogComponent } from './preschool-inquiry-info-dialog/preschool-inquiry-info-dialog.component';
import { PrivilegeDialogComponent } from './privilege-dialog/privilege-dialog.component';
import { RelationTypeDialogComponent } from './relation-type-dialog/relation-type-dialog.component';
import { SchoolInquiryInfoDialogComponent } from './school-inquiry-info-dialog/school-inquiry-info-dialog.component';
import { InquiryCommonInfoComponent } from './shared/components/inquiry-common-info/inquiry-common-info.component';
import { SpecHealthDialogComponent } from './spec-health-dialog/spec-health-dialog.component';
import { EditPetitionComponent } from './shared/components/edit-petition/edit-petition.component';
import { DialogButtonsComponent } from './dialog-buttons/dialog-buttons.component';
import { WizardStorageService } from '../wizard/shared/wizard-storage.service';

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
    HttpInterceptor,
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
    StatusService,
    ActionsButtonsService
  ],
  declarations: [PetitionCardComponent, InquiryReadComponent, InquiryCommonInfoComponent, RegisterSourcePipe,
    PrivilegeDialogComponent, EditPersonDialogComponent, PreschoolInquiryInfoDialogComponent, EditPreschoolInstitutionDialogComponent,
    ContactInfoDialogComponent, EditCurrentEducationPlaceDialogComponent, SchoolInquiryInfoDialogComponent,
    EditChildrenDialogComponent, EditPetitionDialogComponent, PetitionTypePipe, RelationTypeDialogComponent, SpecHealthDialogComponent,EditPetitionComponent, DialogButtonsComponent
  ],
  entryComponents: [PrivilegeDialogComponent, EditPersonDialogComponent, PreschoolInquiryInfoDialogComponent, EditPreschoolInstitutionDialogComponent,
    ContactInfoDialogComponent, EditCurrentEducationPlaceDialogComponent,
    SchoolInquiryInfoDialogComponent, EditPetitionDialogComponent, RelationTypeDialogComponent, SpecHealthDialogComponent]
})
export class InquiryModule { }
