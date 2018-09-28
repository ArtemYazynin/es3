import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService, Inquiry, inquiryType, InquiryService } from '../../../shared';
import { EditContactInfoComponent } from '../../inquiry/shared/components/edit-contact-info/edit-contact-info.component';
import { ContactInfo, StepBase, WizardStorageService } from '../shared';

@Component({
  selector: 'app-contact-info-step',
  templateUrl: './contact-info-step.component.html',
  styleUrls: ['./contact-info-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoStepComponent implements OnInit, StepBase {
  @ViewChild(EditContactInfoComponent) editContactInfoComponent: EditContactInfoComponent;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  inquiry: Inquiry;

  constructor(private formService: FormService, private fb: FormBuilder, private inquiryService:InquiryService,
    private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService) { }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
  }

  isValid(): boolean {
    return this.editContactInfoComponent.isValid();
  }
  goTo = {
    back: () => {
      this.router.navigate(["../parentStep"], { relativeTo: this.route });
    },
    next: () => {
      this.inquiryService.saveContactInfo(this.editContactInfoComponent, (patch)=>{
        this.storageService.set(this.inquiryType, patch);
      })
      if (this.inquiryType == inquiryType.healthCamp) {
        this.router.navigate(["../jobInfoStep"], { relativeTo: this.route });
      } else {
        this.router.navigate(["../privilegeStep"], { relativeTo: this.route });
      }
    }
  }
}
