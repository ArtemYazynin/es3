import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDatePickerModule } from 'mydatepicker';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { BaseResolver } from './shared/base-resolver';
import { HttpInterceptor } from './shared/http-interceptor';
import { WizardStorageService } from './modules/wizard/shared/wizard-storage.service';
import { RegisterCompleteResolver } from './shared/register-complete-resolver';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryService } from './in-memory-server';
import { FormService } from './shared/form.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyDatePickerModule,
    JsonpModule,
    
  ],
  exports: [],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    HttpInterceptor,
    WizardStorageService,
    BaseResolver,
    FormService,
    RegisterCompleteResolver
  ],
  entryComponents: [],//динамически добавляемые компоненты ViewContainerRef.createComponent()
  bootstrap: [AppComponent]
})
export class AppModule {

}
