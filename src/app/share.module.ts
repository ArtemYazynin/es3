import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { ConfirmationDocumentComponent } from "./shared/components/confirmation-document/confirmation-document.component";
import { PrivilegeEditComponent } from "./shared/components/privilege-edit/privilege-edit.component";

@NgModule({
    declarations: [PrivilegeEditComponent, ConfirmationDocumentComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [PrivilegeEditComponent, ConfirmationDocumentComponent],
    providers: [
    ]
})
export class ShareModule {

}