import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService, Inquiry, inquiryType } from '../../../shared';
import { ControlInfo } from '../../../shared/models/controlInfo';
import { ContactInfo, StepBase, WizardStorageService } from '../shared';
import { EditContactInfoComponent } from '../../inquiry/shared/components/edit-contact-info/edit-contact-info.component';

@Component({
  selector: 'app-contact-info-step',
  templateUrl: './contact-info-step.component.html',
  styleUrls: ['./contact-info-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoStepComponent implements OnInit, StepBase {
  @ViewChild(EditContactInfoComponent) editContactInfoComponent: EditContactInfoComponent;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  inquiry:Inquiry;
  
  constructor(private formService: FormService, private fb: FormBuilder,
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
      (() => {
        const contactInfo = new ContactInfo(this.editContactInfoComponent.contactsForm);
        this.storageService.set(this.inquiryType, { contactInfo: contactInfo })
      })();

      if (this.inquiryType == inquiryType.healthCamp) {
        this.router.navigate(["../jobInfoStep"], { relativeTo: this.route });
      } else {
        this.router.navigate(["../privilegeStep"], { relativeTo: this.route });
      }
    }
  }


}
