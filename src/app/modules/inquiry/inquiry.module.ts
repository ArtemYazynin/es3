import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { MaterialModule } from '../../material.module';
import { ShareModule } from '../../share.module';
import { RegisterSourcePipe } from '../../shared/models/register-source.pipe';
import { RegisterCompleteResolver } from '../../shared/register-complete-resolver';
import { StatusService } from '../../shared/status.service';
import { EditPersonDialogComponent } from './edit-person-dialog/edit-person-dialog.component';
import { InquiryReadComponent } from './inquiry-read/inquiry-read.component';
import { DialogEditComponent } from './shared/components/dialog-edit/dialog-edit.component';
import { InquiryCommonInfoComponent } from './shared/components/inquiry-common-info/inquiry-common-info.component';
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
  declarations: [InquiryReadComponent, InquiryCommonInfoComponent, RegisterSourcePipe, DialogEditComponent, InquiryInfoEditComponent, EditPersonDialogComponent],
  providers: [StatusService],
  entryComponents: [DialogEditComponent, EditPersonDialogComponent,]
})
export class InquiryModule { }
