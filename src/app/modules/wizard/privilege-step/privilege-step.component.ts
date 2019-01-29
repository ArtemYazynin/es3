import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditPrivilegeComponent } from '../../../shared/components/edit-privilege/edit-privilege.component';
import { WizardStorageService } from '../shared';

@Component({
  selector: 'app-privilege-step',
  providers: [ActionsButtonsService],
  templateUrl: './privilege-step.component.html',
  styleUrls: ['./privilege-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivilegeStepComponent implements OnInit {
  @ViewChild(EditPrivilegeComponent) privilegeEditComponent: EditPrivilegeComponent;
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  config: ConfigsOfRoutingButtons;

  constructor(private storageService: WizardStorageService, private router: Router, private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute, private actionsButtonsService: ActionsButtonsService) {
  }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionPrivilegeStep(this.privilegeEditComponent, this.inquiry, this.activatedRoute),
      this.actionsButtonsService.inverseActionPrivilegeStep(this.inquiry.type, this.router, this.activatedRoute)
    );
  }

  isValid() {
    let result = this.privilegeEditComponent.privilegeForm.controls.withoutPrivilege.value
      ? true
      : !!this.privilegeEditComponent.privilegeForm.controls.privilegeOrder.value
      && !!this.privilegeEditComponent.privilegeForm.controls.privilege.value
      && !!this.privilegeEditComponent.confirmationProofDocumentComponent
      && !!this.privilegeEditComponent.confirmationProofDocumentComponent.form.valid;
    return result;
  }
}
