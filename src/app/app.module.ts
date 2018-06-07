import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { WizardComponent } from './wizard/wizard.component';
import { EnumToArrayPipe } from './shared/enum-to-array-pipe';
import { IdentityCardTypeFriendlyNamePipe } from './shared/identity-card-type-friendly-name.pipe';
import { IdentityCardComponent } from './identity-card/identity-card.component';


@NgModule({
  declarations: [
    AppComponent,
    WizardComponent,
    EnumToArrayPipe,
    IdentityCardTypeFriendlyNamePipe,
    IdentityCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
