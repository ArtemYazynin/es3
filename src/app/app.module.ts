import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { DateAdapter } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { InquiryReadComponentComponent } from './inquiry/inquiry-read-component/inquiry-read-component.component';
import { WizardModule } from './wizard/wizard.module';

@NgModule({
  declarations: [InquiryReadComponentComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    WizardModule,
    BrowserAnimationsModule,
    MyDatePickerModule, JsonpModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  entryComponents: [],//динамически добавляемые компоненты ViewContainerRef.createComponent()
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('ru-RU'); // DD/MM/YYYY
  }
}
