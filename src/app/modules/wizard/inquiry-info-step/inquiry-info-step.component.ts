import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditInquiryInfoComponent } from '../../inquiry/shared/components/edit-inquiry-info/edit-inquiry-info.component';
import { StepBase, WizardStorageService } from '../shared';


@Component({
  selector: 'app-inquiry-info-step',
  templateUrl: './inquiry-info-step.component.html',
  styleUrls: ['./inquiry-info-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquiryInfoStepComponent implements OnInit, StepBase {
  @ViewChild(EditInquiryInfoComponent) editInquiryInfoComponent: EditInquiryInfoComponent;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  inquiry: Inquiry;
  config: ConfigsOfRoutingButtons;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService,
    private actionsButtonsService: ActionsButtonsService) { }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionInquiryInfoStep(this.editInquiryInfoComponent, this.inquiryType, this.router, this.route),
      this.actionsButtonsService.inverseActionInquiryInfoStep(this.inquiryType, this.router, this.route)
    );
  }
}