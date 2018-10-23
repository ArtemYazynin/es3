import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService, inquiryType } from '../../../shared';
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
  configs: ConfigsOfRoutingButtons;

  constructor(private storageService: WizardStorageService, private router: Router, private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute, private cdr: ChangeDetectorRef, private inquiryService: InquiryService) {
  }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    this.configs = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        this.inquiryService.savePrivilege(this.privilegeEditComponent, (patch) => {
          this.storageService.set(this.inquiry.type, patch);
        });

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
      },
      () => {
        if (this.inquiryType == inquiryType.healthCamp) {
          this.router.navigate(["../jobInfoStep"], { relativeTo: this.activatedRoute });
        } else {
          this.router.navigate(["../contactInfoStep"], { relativeTo: this.activatedRoute });
        }
      }
    );
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
}
