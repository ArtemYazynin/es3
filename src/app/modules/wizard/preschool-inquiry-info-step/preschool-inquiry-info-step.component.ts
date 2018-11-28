import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditPreschoolInquiryInfoComponent } from '../../inquiry/shared/components/edit-preschool-inquiry-info/edit-preschool-inquiry-info.component';
import { WizardStorageService } from '../shared';


@Component({
  selector: 'app-preschool-inquiry-info-step',
  templateUrl: './preschool-inquiry-info-step.component.html',
  styleUrls: ['./preschool-inquiry-info-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreschoolInquiryInfoStepComponent implements OnInit {
  @ViewChild(EditPreschoolInquiryInfoComponent) editInquiryInfoComponent: EditPreschoolInquiryInfoComponent;
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  config: ConfigsOfRoutingButtons;

  constructor(private router: Router, private route: ActivatedRoute, private actionsButtonsService: ActionsButtonsService) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionInquiryInfoStep(this.editInquiryInfoComponent, this.inquiry.type, this.router, this.route),
      this.actionsButtonsService.inverseActionInquiryInfoStep(this.inquiry.type, this.router, this.route)
    );
  }
}