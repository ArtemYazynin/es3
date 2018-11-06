import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ApplicantType, BehaviorMode, ButtonsTitles, CitizenshipService, ConfigsOfRoutingButtons, ConfirmationDocument, Country, DrawService, Entity, Group, Inquiry, inquiryType, SpecHealth, SpecHealthService } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { PersonType } from '../../../shared/person-type.enum';
import { StepBase, WizardStorageService } from '../shared';

@Component({
  selector: 'app-preview-step',
  providers: [ActionsButtonsService],
  templateUrl: './preview-step.component.html',
  styleUrls: ['./preview-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewStepComponent implements OnInit, OnDestroy, StepBase {

  constructor(private router: Router, private route: ActivatedRoute, private citizenshipService: CitizenshipService,
    private storageService: WizardStorageService, public drawService: DrawService, private specHealthService: SpecHealthService,
    public dialog: MatDialog, private actionsButtonsService: ActionsButtonsService) { }

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  personTypes = PersonType;
  $group: Observable<Group>;
  $institutionType: Observable<Entity<number>>
  $specHealth: Observable<SpecHealth>
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  $applicantRepresentParentDocument: BehaviorSubject<ConfirmationDocument>;
  countries: Array<Country> = [];
  inquiry: Inquiry;
  inquiryTypes = inquiryType;
  applicantTypes = ApplicantType;
  config: ConfigsOfRoutingButtons;


  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
    if (this.inquiry.applicant) {
      this.$applicantRepresentParentDocument = new BehaviorSubject<ConfirmationDocument>(this.inquiry.applicant.applicantRepresentParentDocument);
    }
    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.countries = data;
      });
    this.$specHealth = this.specHealthService.get(this.inquiry.children[0].specHealth).pipe(takeUntil(this.ngUnsubscribe), map(x => x[0]));

    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Register, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionPreviewStep(this.inquiry, this.inquiryType, this.router, this.route),
      this.actionsButtonsService.inverseActionPreviewStep(this.router, this.route)
    );
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}