import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { ApplicantType, ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared/index';
import { EditPersonComponent } from '../../inquiry/shared/components/edit-person/edit-person.component';
import { StepBase, WizardStorageService } from '../shared/index';

@Component({
  selector: 'app-applicant-step',
  templateUrl: './applicant-step.component.html',
  styleUrls: ['./applicant-step.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicantStepComponent implements OnInit, AfterViewInit, StepBase {

  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService,
    private cdr: ChangeDetectorRef, private actionsButtonsService: ActionsButtonsService) { }

  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  applicantTypes = ApplicantType;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionApplicantStep(this.editPersonComponent, this.inquiry, this.inquiryType, this.router, this.route),
      this.actionsButtonsService.inverseActionApplicantStep(this.router, this.route)
    );
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
