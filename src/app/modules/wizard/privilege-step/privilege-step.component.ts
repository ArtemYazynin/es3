import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentType, CommonService, Inquiry, inquiryType, Privilege } from '../../../shared';
import { PrivilegeEditComponent } from '../../../shared/components/privilege-edit/privilege-edit.component';
import { StepBase, WizardStorageService } from '../shared';

@Component({
  selector: 'app-privilege-step',
  templateUrl: './privilege-step.component.html',
  styleUrls: ['./privilege-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivilegeStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(PrivilegeEditComponent) privilegeEditComponent: PrivilegeEditComponent;
  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;

  constructor(private storageService: WizardStorageService, private router: Router, private activatedRoute: ActivatedRoute,
    private commonService: CommonService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  isValid() {
    let result = this.privilegeEditComponent.privilegeForm.controls.withoutPrivilege.value
      ? true
      : !!this.privilegeEditComponent.privilegeForm.controls.privilegeOrder.value
      && !!this.privilegeEditComponent.privilegeForm.controls.privilege.value
      && !!this.privilegeEditComponent.confirmationProofDocumentComponent
      && !!this.privilegeEditComponent.confirmationProofDocumentComponent.confirmationDocumentForm.valid;
    return result;
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
        let privilege: Privilege = new Privilege();
        if (!this.privilegeEditComponent.privilegeForm.controls.withoutPrivilege.value) {
          privilege.id = this.privilegeEditComponent.privilegeForm.controls.privilege.value.id;
          privilege.name = this.privilegeEditComponent.privilegeForm.controls.privilege.value.name;
          privilege.privilegeOrder = this.privilegeEditComponent.privilegeForm.controls.privilegeOrder.value;
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
