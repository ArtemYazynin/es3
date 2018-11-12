import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, InquiryRequest, InquiryService, inquiryType, FormService } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
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
  inquiry: InquiryRequest;
  config: ConfigsOfRoutingButtons;

  constructor(private formService: FormService, private fb: FormBuilder, private inquiryService:InquiryService,
    private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService, private actionsButtonsService:ActionsButtonsService) { }

  ngOnInit() {
    this.inquiry = <InquiryRequest>this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionContactInfoStep(this.editContactInfoComponent, this.inquiryType, this.router, this.route),
      this.actionsButtonsService.inverseActionContactInfoStep(this.router, this.route)
    );
  }
}
