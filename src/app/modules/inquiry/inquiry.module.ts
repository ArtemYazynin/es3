import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryReadComponent } from './inquiry-read/inquiry-read.component';
import { RouterModule } from '@angular/router';
import { RegisterCompleteResolver } from '../../shared/register-complete-resolver';
import { MaterialModule } from '../../material.module';
import { StatusService } from '../../shared/status.service';
import { HttpClientModule } from '@angular/common/http';
import { JsonpModule, HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MyDatePickerModule } from 'mydatepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { InquiryEditCommonComponent } from './inquiry-edit-common/inquiry-edit-common.component';
import { InquiryCommonInfoComponent } from './shared/components/inquiry-common-info/inquiry-common-info.component';
import { RegisterSourcePipe } from '../../shared/models/register-source.pipe';

@NgModule({
  imports: [
    BrowserModule,
    MyDatePickerModule,
    TextMaskModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,


    CommonModule,
    MaterialModule,
    RouterModule.forRoot([
      {
        path: "inquiry/:id",
        component: InquiryReadComponent,
        resolve: {
          resolved: RegisterCompleteResolver
        }
      },
      {
        path: "inquiry/:id/edit/common",
        component: InquiryEditCommonComponent,
        resolve: {
          resolved: RegisterCompleteResolver
        }
      },
      {
        path: "inquiry/:id/edit/privilege",
        component: InquiryEditCommonComponent,
        resolve: {
          resolved: RegisterCompleteResolver
        }
      }
    ]),
  ],
  declarations: [InquiryReadComponent, InquiryEditCommonComponent, InquiryCommonInfoComponent, RegisterSourcePipe],
  providers: [StatusService]
})
export class InquiryModule { }
