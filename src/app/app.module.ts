import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { EnumToArrayPipe } from './shared/enum-to-array-pipe';
import { IdentityCardTypeFriendlyNamePipe } from './shared/identity-card-type-friendly-name.pipe';
import { IdentityCardComponent } from './person/identity-card/identity-card.component';
import { ConfirmationDocumentComponent } from './confirmation-document/confirmation-document.component';
import { FormService } from './shared/form.service';
import { WizardStorageService } from './shared/wizard-storage.service';
import { ApplicantTypeStepComponent } from './wizard/applicant-type-step/applicant-type-step.component';
import { ParentStepComponent } from './wizard/parent-step/parent-step.component';

import { HttpClientModule } from '@angular/common/http';
 
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemHeroService } from './in-memory-server';
import { CitizenshipService } from './shared/citizenships/citizenship.service';
import { RelationTypeService } from './shared/relationTypes/relation-type.service';
import { HttpInterceptor } from './shared/http-interceptor';
import { FullNameComponent } from './person/full-name/full-name.component';
import { BirthInfoComponent } from './person/birth-info/birth-info.component';
 


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
    BirthInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
  HttpClientModule,
  InMemoryWebApiModule.forRoot(InMemHeroService),
  ],
  providers: [HttpInterceptor,FormService, WizardStorageService, CitizenshipService,RelationTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
