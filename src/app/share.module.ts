import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { ConfirmationDocumentComponent } from "./shared/components/confirmation-document/confirmation-document.component";
import { PrivilegeEditComponent } from "./shared/components/privilege-edit/privilege-edit.component";
import { ApplicantTypePipe } from "./shared/applicant-type.pipe";
import { InquiryTypeFriendlyNamePipe } from './shared/inquiry-type.pipe';

@NgModule({
    declarations: [PrivilegeEditComponent, ConfirmationDocumentComponent, ApplicantTypePipe, InquiryTypeFriendlyNamePipe],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [PrivilegeEditComponent, ConfirmationDocumentComponent, ApplicantTypePipe, InquiryTypeFriendlyNamePipe],
    providers: [
    ]
})
export class ShareModule {

}