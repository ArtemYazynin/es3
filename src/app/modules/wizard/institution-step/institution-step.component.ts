import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditInstitutionsComponent } from '../../inquiry/shared/components/edit-institutions/edit-institutions.component';

@Component({
  selector: 'app-institution-step',
  templateUrl: './institution-step.component.html',
  styleUrls: ['./institution-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstitutionStepComponent implements OnInit {
  @ViewChild(EditInstitutionsComponent) editInstitutionsComponent: EditInstitutionsComponent;
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  config: ConfigsOfRoutingButtons;

  constructor(private router: Router, private route: ActivatedRoute, private actionsButtonsService: ActionsButtonsService) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionInsitutionStep(this.editInstitutionsComponent, this.inquiry, this.inquiry.type, this.router, this.route),
      this.actionsButtonsService.inverseActionInsitutionStep(this.inquiry, this.router, this.route)
    );
  }
}
