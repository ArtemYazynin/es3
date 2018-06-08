import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { FormsModule ,ReactiveFormsModule } from "@angular/forms";

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { WizardComponent } from './wizard/wizard.component';
import { EnumToArrayPipe } from './shared/enum-to-array-pipe';
import { IdentityCardTypeFriendlyNamePipe } from './shared/identity-card-type-friendly-name.pipe';
import { IdentityCardComponent } from './identity-card/identity-card.component';
import { ConfirmationDocumentComponent } from './confirmation-document/confirmation-document.component';
import { FormService } from './shared/form.service';


@NgModule({
  declarations: [
    AppComponent,
    WizardComponent,
    EnumToArrayPipe,
    IdentityCardTypeFriendlyNamePipe,
    IdentityCardComponent,
    ConfirmationDocumentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
