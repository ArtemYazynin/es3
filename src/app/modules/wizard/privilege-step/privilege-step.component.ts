import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { PrivilegeEditComponent } from '../../../shared/components/privilege-edit/privilege-edit.component';
import { StepBase, WizardStorageService } from '../shared';

@Component({
  selector: 'app-privilege-step',
  providers:[ActionsButtonsService],
  templateUrl: './privilege-step.component.html',
  styleUrls: ['./privilege-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivilegeStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(PrivilegeEditComponent) privilegeEditComponent: PrivilegeEditComponent;
  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  config: ConfigsOfRoutingButtons;

  constructor(private storageService: WizardStorageService, private router: Router, private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute, private cdr: ChangeDetectorRef, private actionsButtonsService: ActionsButtonsService) {
  }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
  this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionPrivilegeStep(this.privilegeEditComponent, this.inquiry, this.activatedRoute),
      this.actionsButtonsService.inverseActionPrivilegeStep(this.inquiryType, this.router, this.activatedRoute)
    );
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
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
