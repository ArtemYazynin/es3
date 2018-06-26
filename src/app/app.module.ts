import { BrowserModule } from '@angular/platform-browser';
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
import { EnumToArrayPipe, IdentityCardTypeFriendlyNamePipe, FormService, WizardStorageService, CitizenshipService, RelationTypeService, IdentityCardService } from './shared/index';
import { MyDatePickerModule } from 'mydatepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { CitizenshipComponent } from './person/citizenship/citizenship.component';

@NgModule({
  declarations: [
    AppComponent,
    EnumToArrayPipe,
    IdentityCardTypeFriendlyNamePipe,
    IdentityCardComponent,
    ConfirmationDocumentComponent,
    ApplicantTypeStepComponent,
    ParentStepComponent,
    FullNameComponent,
    BirthInfoComponent,
    ApplicantStepComponent,
    ChildrenStepComponent,
    CitizenshipComponent
  ],
  imports: [
    BrowserModule,
    MyDatePickerModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
  HttpClientModule,
  InMemoryWebApiModule.forRoot(InMemoryService),
  ],
  providers: [HttpInterceptor,FormService, WizardStorageService, CitizenshipService,RelationTypeService,IdentityCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
