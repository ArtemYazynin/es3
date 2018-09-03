import { NgModule } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDatePickerModule } from 'mydatepicker';
import { AppComponent } from './app.component';
import { WizardModule } from './wizard/wizard.module';
import { JsonpModule } from '@angular/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    WizardModule,
    BrowserAnimationsModule,
    MyDatePickerModule,JsonpModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  entryComponents: [],//динамически добавляемые компоненты ViewContainerRef.createComponent()
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('ru-RU'); // DD/MM/YYYY
  }
}
