import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentType, CommonService, Inquiry, inquiryType, Privilege } from '../../../shared';
import { PrivilegeEditComponent } from '../../../shared/components/privilege-edit/privilege-edit.component';
import { StepBase, WizardStorageService } from '../shared';

@Component({
  selector: 'app-privilege-step',
  templateUrl: './privilege-step.component.html',
  styleUrls: ['./privilege-step.component.css']
})
export class PrivilegeStepComponent implements OnInit, StepBase {
  @ViewChild(PrivilegeEditComponent) privilegeEditComponent: PrivilegeEditComponent;
  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;

  constructor(private storageService: WizardStorageService, private router: Router, private activatedRoute: ActivatedRoute,
    private commonService: CommonService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
  }

  isValid() {
    let check = (): boolean => {
      return this.privilegeEditComponent.privilegeForm.controls.privilegeOrder.value
        && this.privilegeEditComponent.privilegeForm.controls.privilege.value
        && this.privilegeEditComponent.confirmationProofDocumentComponent
        && this.privilegeEditComponent.confirmationProofDocumentComponent.confirmationDocumentForm.valid;
    }
    return this.privilegeEditComponent.privilegeForm.controls.withoutPrivilege.value
      ? true
      : check();
  }

  goTo = {
    back: () => {
      if (this.inquiryType == inquiryType.healthCamp) {
        this.router.navigate(["../jobInfoStep"], { relativeTo: this.activatedRoute });
      } else {
        this.router.navigate(["../contactInfoStep"], { relativeTo: this.activatedRoute });
      }
    },
    next: () => {
      (() => {
        let privilege: Privilege;
        if (this.privilegeEditComponent.privilegeForm.controls.withoutPrivilege.value) {
          privilege = new Privilege(undefined, undefined, undefined);
        } else {
          privilege = new Privilege(this.privilegeEditComponent.privilegeForm.controls.privilege.value.id, 
              this.privilegeEditComponent.privilegeForm.controls.privilege.value.name, 
              this.privilegeEditComponent.privilegeForm.controls.privilegeOrder.value);
          privilege.privilegeProofDocument = 
            this.commonService.getDocumentByType([this.privilegeEditComponent.confirmationProofDocumentComponent], AttachmentType.PrivilegeProofDocument);
        }
        this.storageService.set(this.inquiryType, { privilege: privilege });
      })();

      switch (this.inquiryType) {
        case inquiryType.profEducation:
          this.router.navigate(["../educDocumentInfoStep"], { relativeTo: this.activatedRoute });
          break;
        case inquiryType.preschool:
          this.router.navigate(["../inquiryInfoStep"], { relativeTo: this.activatedRoute });
          break;
        case inquiryType.school:
          this.router.navigate(["../schoolInquiryInfoStep"], { relativeTo: this.activatedRoute });
          break;
        default:
          break;
      }
    }
  }
}
