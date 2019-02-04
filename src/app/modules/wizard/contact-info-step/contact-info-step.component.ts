import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, inquiryType } from '../../../shared';
import { EditContactInfoComponent } from '../../inquiry/shared/components/edit-contact-info/edit-contact-info.component';
import { ContactInfo, WizardStorageService } from '../shared';

@Component({
  selector: 'app-contact-info-step',
  templateUrl: './contact-info-step.component.html',
  styleUrls: ['./contact-info-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoStepComponent implements OnInit {
  @ViewChild(EditContactInfoComponent) editContactInfoComponent: EditContactInfoComponent;
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  config: ConfigsOfRoutingButtons;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService) { }

  ngOnInit() {
    this.config = this.getConfig();
  }

  getConfig() {
    return new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        const contactInfo = ContactInfo.buildByForm(this.editContactInfoComponent.contactsForm);
        this.storageService.set(this.inquiry.type, { contactInfo: contactInfo });
        if (this.inquiry.type == inquiryType.healthCamp) {
          this.navigate("jobInfoStep");
        } else {
          this.navigate("privilegeStep");
        }
      },
      () => {
        if (this.inquiry.applicantType == ApplicantType.Child) {
          this.navigate("applicantTypeStep");
        } else {
          this.navigate("parentStep");
        }
      }
    );
  }

  private navigate(stepName: string) {
    if (!stepName) return;
    this.router.navigate([`../${stepName}`], { relativeTo: this.route });
  }
}
