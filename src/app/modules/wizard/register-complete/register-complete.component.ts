import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { StepBase } from '../shared/models/step-base';

@Component({
  selector: 'app-register-complete',
  templateUrl: './register-complete.component.html',
  styleUrls: ['./register-complete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterCompleteComponent implements OnInit, StepBase {
  inquiryId: string = this.route.snapshot.data.resolved.inquiryId;
  inquiryType: string = this.route.snapshot.data.resolved.inquiryType;
  isValid(): boolean { return; }
  config: ConfigsOfRoutingButtons;

  constructor(private router: Router, private route: ActivatedRoute, private actionsButtonsService: ActionsButtonsService) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.RegisterNew, ButtonsTitles.GoToInquiry,
      this.actionsButtonsService.primaryActionRegisterComplete(this.router, this.route),
      this.actionsButtonsService.inverseActionRegisterComplete(this.inquiryId, this.router)
    );
  }
}