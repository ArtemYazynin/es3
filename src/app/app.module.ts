import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDatePickerModule } from 'mydatepicker';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { WizardStorageService } from './modules/wizard/shared/wizard-storage.service';
import { BaseResolver } from './shared/base-resolver';
import { FormService } from './shared/form.service';
import { RegisterCompleteResolver } from './shared/register-complete-resolver';
import { ScopeSelectorComponent } from './scope-selector/scope-selector.component';
import { MenuComponent } from './menu/menu.component';
import { InMemoryService } from './in-memory-server';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';
import { BreadsCrumbsService } from './shared/breads-crumbs.service';
import { BreadsCrumbsComponent } from './modules/wizard/breads-crumbs/breads-crumbs.component';
import { HeaderComponent } from './header/header.component';
import { InquiryViewResolver } from './shared/inquiry-view-resolver';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Es3Interceptor } from './shared/Es3Interceptor';

export const esConstant = new InjectionToken<any>("esConstant");
export const SERVER_URL = new InjectionToken<string>("SERVER_URL");

const constants = {
  fileNotChoosen: "Файл не выбран",
  noRestrictions: 101,
  inquiryInfoTitle: "Параметры заявления"
}
@NgModule({
  declarations: [AppComponent, ScopeSelectorComponent, MenuComponent, BreadsCrumbsComponent, HeaderComponent],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyDatePickerModule,
    JsonpModule,
    HttpClientModule 
  ],
  exports: [],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } },
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    WizardStorageService,
    BaseResolver,
    FormService,
    BreadsCrumbsService,
    RegisterCompleteResolver,
    InquiryViewResolver,
    {
      provide: esConstant,
      useValue: constants
    },
    { provide: SERVER_URL, useValue: "http://localhost:3500" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Es3Interceptor,
      multi: true,
    }

  ],
  entryComponents: [],//динамически добавляемые компоненты ViewContainerRef.createComponent()
  bootstrap: [AppComponent, ScopeSelectorComponent, MenuComponent, BreadsCrumbsComponent, HeaderComponent]
})
export class AppModule {

}
