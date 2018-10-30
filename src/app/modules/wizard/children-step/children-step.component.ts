import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { StepBase, WizardStorageService } from '../shared';
import { EditChildrenComponent } from './../../inquiry/shared/components/edit-children/edit-children.component';


@Component({
  selector: 'app-children-step',
  providers: [ActionsButtonsService],
  templateUrl: './children-step.component.html',
  styleUrls: ['./children-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(EditChildrenComponent) editChildrenComponent: EditChildrenComponent;

  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  config: ConfigsOfRoutingButtons;

  constructor(private route: ActivatedRoute, private storageService: WizardStorageService, private actionsButtonsService: ActionsButtonsService) { }

  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionChildrenStep(this.editChildrenComponent, this.inquiryType),
      this.actionsButtonsService.inverseActionChildrenStep()
    );
  }

  ngAfterViewInit() {
    if (!this.inquiry || !this.inquiry.children || this.inquiry.children.length == 0) {
      this.editChildrenComponent.navBarManager.add();
    }
  }
}
