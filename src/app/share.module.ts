import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { TextMaskModule } from "angular2-text-mask";
import { MaterialModule } from "./material.module";
import { ApplicantTypePipe } from "./shared/applicant-type.pipe";
import { AddressComponent } from "./shared/components/address/address.component";
import { BirthInfoComponent } from "./shared/components/birth-info/birth-info.component";
import { CitizenshipSelectComponent } from "./shared/components/citizenship-select/citizenship-select.component";
import { ConfirmationDocumentComponent } from "./shared/components/confirmation-document/confirmation-document.component";
import { ForeignCitizensAddressesComponent } from "./shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component";
import { FullNameComponent } from "./shared/components/full-name/full-name.component";
import { GenderComponent } from "./shared/components/gender/gender.component";
import { IdentityCardComponent } from "./shared/components/identity-card/identity-card.component";
import { PrivilegeEditComponent } from "./shared/components/privilege-edit/privilege-edit.component";
import { RelationTypeComponent } from "./shared/components/relation-type/relation-type.component";
import { RfCitizensAddressesComponent } from "./shared/components/rf-citizens-addresses/rf-citizens-addresses.component";
import { SnilsComponent } from "./shared/components/snils/snils.component";
import { InquiryTypeFriendlyNamePipe } from './shared/inquiry-type.pipe';
import { EditParentComponent } from "./modules/inquiry/shared/components/edit-parent/edit-parent.component";

@NgModule({
    declarations: [
        PrivilegeEditComponent, ConfirmationDocumentComponent, ApplicantTypePipe, InquiryTypeFriendlyNamePipe, FullNameComponent, GenderComponent,
        SnilsComponent, IdentityCardComponent, CitizenshipSelectComponent, RfCitizensAddressesComponent, AddressComponent, ForeignCitizensAddressesComponent,
        BirthInfoComponent, RelationTypeComponent, EditParentComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgSelectModule
    ],
    exports: [
        PrivilegeEditComponent, ConfirmationDocumentComponent, ApplicantTypePipe, InquiryTypeFriendlyNamePipe, FullNameComponent, GenderComponent,
        SnilsComponent, IdentityCardComponent, CitizenshipSelectComponent, RfCitizensAddressesComponent, AddressComponent, ForeignCitizensAddressesComponent,
        BirthInfoComponent, RelationTypeComponent, EditParentComponent
    ],
    providers: [
    ]
})
export class ShareModule {

}