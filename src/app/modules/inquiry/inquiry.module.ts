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
import { InquiryCommonInfoComponent } from './shared/components/inquiry-common-info/inquiry-common-info.component';
import { RegisterSourcePipe } from '../../shared/models/register-source.pipe';
import { DialogEditComponent } from './shared/components/dialog-edit/dialog-edit.component';
import { ShareModule } from '../../share.module';
import { EditParentDialogComponent } from './edit-parent-dialog/edit-parent-dialog.component';
import { InquiryInfoEditComponent } from './shared/components/inquiry-info-edit/inquiry-info-edit.component';

@NgModule({
  imports: [
    BrowserModule,
    ShareModule,
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
      }
    ]),

  ],
  declarations: [InquiryReadComponent, InquiryCommonInfoComponent, RegisterSourcePipe, DialogEditComponent, InquiryInfoEditComponent, EditParentDialogComponent],
  providers: [StatusService],
  entryComponents: [DialogEditComponent,EditParentDialogComponent]
})
export class InquiryModule { }
