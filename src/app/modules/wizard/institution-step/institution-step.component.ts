import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditInstitutionsComponent } from '../../inquiry/shared/components/edit-institutions/edit-institutions.component';
import { StepBase, WizardStorageService } from '../shared';

@Component({
  selector: 'app-institution-step',
  templateUrl: './institution-step.component.html',
  styleUrls: ['./institution-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstitutionStepComponent implements OnInit, StepBase {
  @ViewChild(EditInstitutionsComponent) editInstitutionsComponent: EditInstitutionsComponent;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  inquiry: Inquiry;
  config: ConfigsOfRoutingButtons;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService,
    private actionsButtonsService: ActionsButtonsService) { }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionInsitutionStep(this.editInstitutionsComponent, this.inquiry, this.inquiryType, this.router, this.route),
      this.actionsButtonsService.inverseActionInsitutionStep(this.inquiry, this.router, this.route)
    );
  }
}
