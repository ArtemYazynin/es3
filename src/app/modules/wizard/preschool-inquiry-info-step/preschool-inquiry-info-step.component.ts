import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditPreschoolInquiryInfoComponent } from '../../inquiry/shared/components/edit-preschool-inquiry-info/edit-preschool-inquiry-info.component';
import { StepBase, WizardStorageService } from '../shared';


@Component({
  selector: 'app-preschool-inquiry-info-step',
  templateUrl: './preschool-inquiry-info-step.component.html',
  styleUrls: ['./preschool-inquiry-info-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class PreschoolInquiryInfoStepComponent implements OnInit, StepBase {
  @ViewChild(EditPreschoolInquiryInfoComponent) editInquiryInfoComponent: EditPreschoolInquiryInfoComponent;
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