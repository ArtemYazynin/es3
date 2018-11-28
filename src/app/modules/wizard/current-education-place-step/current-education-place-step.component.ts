import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, Theme } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditCurrentEducationPlaceComponent } from '../../inquiry/shared/components/edit-current-education-place/edit-current-education-place.component';
import { StepBase, WizardStorageService } from '../shared';

@Component({
  selector: 'app-curren-education-place-step',
  templateUrl: './current-education-place-step.component.html',
  styleUrls: ['./current-education-place-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentEducationPlaceStepComponent implements OnInit {
  @ViewChild(EditCurrentEducationPlaceComponent) editCurrentEducationPlaceComponent: EditCurrentEducationPlaceComponent;
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  config: ConfigsOfRoutingButtons;
  themes = Theme;

  constructor(private route: ActivatedRoute, private router: Router, private storageService: WizardStorageService, private actionsButtonsService: ActionsButtonsService) { }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiry.type);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionCurrentEducationPlaceStep(this.editCurrentEducationPlaceComponent, this.inquiry.type, this.router, this.route),
      this.actionsButtonsService.inverseActionCurrentEducationPlaceStep(this.router, this.route)
    );
  }

  isValid() {
    return this.editCurrentEducationPlaceComponent.currentPlaceForm && this.editCurrentEducationPlaceComponent.currentPlaceForm.valid || false;
  }
}
