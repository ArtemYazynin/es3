import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Applicant, ApplicantType, BehaviorMode, ButtonsTitles, Child, CitizenshipService, ConfigsOfRoutingButtons, ConfirmationDocument, Country, DrawService, Entity, Group, Inquiry, inquiryType, Parent, SpecHealth, SpecHealthService, Theme } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { PersonType } from '../../../shared/person-type.enum';
import { WizardStorageService } from '../shared';

@Component({
  selector: 'app-preview-step',
  providers: [ActionsButtonsService],
  templateUrl: './preview-step.component.html',
  styleUrls: ['./preview-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewStepComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private citizenshipService: CitizenshipService,
    public drawService: DrawService, public dialog: MatDialog, private actionsButtonsService: ActionsButtonsService) { }

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  themes = Theme;
  personTypes = PersonType;
  $applicantRepresentParentDocument: BehaviorSubject<ConfirmationDocument>;
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  inquiryTypes = inquiryType;
  config: ConfigsOfRoutingButtons;
  $applicant: BehaviorSubject<Applicant>;
  $parent: BehaviorSubject<Parent>;

  ngOnInit() {
    this.$applicant = new BehaviorSubject<Applicant>(this.inquiry.applicant);
    this.$parent = new BehaviorSubject<Parent>(this.inquiry.parent);

    if (this.inquiry.applicant) {
      this.$applicantRepresentParentDocument = new BehaviorSubject<ConfirmationDocument>(this.inquiry.applicant.applicantRepresentParentDocument);
    }

    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Register, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionPreviewStep(this.inquiry, this.inquiry.type, this.router, this.route),
      this.actionsButtonsService.inverseActionPreviewStep(this.router, this.route)
    );
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}