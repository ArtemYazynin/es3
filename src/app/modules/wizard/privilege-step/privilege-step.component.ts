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
  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  config: ConfigsOfRoutingButtons;

  constructor(private storageService: WizardStorageService, private router: Router, private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute, private actionsButtonsService: ActionsButtonsService) {
  }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionPrivilegeStep(this.privilegeEditComponent, this.inquiry, this.activatedRoute),
      this.actionsButtonsService.inverseActionPrivilegeStep(this.inquiryType, this.router, this.activatedRoute)
    );
  }

  isValid() {
    let result = this.privilegeEditComponent.privilegeForm.controls.withoutPrivilege.value
      ? true
      : !!this.privilegeEditComponent.privilegeForm.controls.privilegeOrder.value
      && !!this.privilegeEditComponent.privilegeForm.controls.privilege.value
      && !!this.privilegeEditComponent.confirmationProofDocumentComponent
      && !!this.privilegeEditComponent.confirmationProofDocumentComponent.confirmationDocumentForm.valid;
    return result;
  }
}
