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
import { HttpInterceptor } from './shared/http-interceptor';
import { RegisterCompleteResolver } from './shared/register-complete-resolver';
import { ScopeSelectorComponent } from './scope-selector/scope-selector.component';
import { MenuComponent } from './menu/menu.component';

export const esConstant = new InjectionToken<{ fileNotChoosen: string }>("esConstant");
const constants = {
  fileNotChoosen: "Файл не выбран"
}
@NgModule({
  declarations: [AppComponent, ScopeSelectorComponent, MenuComponent],
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
    RegisterCompleteResolver,
    {
      provide: esConstant,
      useValue: constants
    }
  ],
  entryComponents: [],//динамически добавляемые компоненты ViewContainerRef.createComponent()
  bootstrap: [AppComponent, ScopeSelectorComponent, MenuComponent]
})
export class AppModule {

}
