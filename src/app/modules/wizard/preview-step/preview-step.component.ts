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
  $group: Observable<Group>;
  $institutionType: Observable<Entity<number>>
  $specHealth: Observable<SpecHealth>;
  $applicantRepresentParentDocument: BehaviorSubject<ConfirmationDocument>;
  countries: Array<Country> = [];
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  inquiryTypes = inquiryType;
  applicantTypes = ApplicantType;
  config: ConfigsOfRoutingButtons;

  children: Array<BehaviorSubject<Child>> = [];
  $applicant: BehaviorSubject<Applicant>;
  $parent: BehaviorSubject<Parent>;

  ngOnInit() {
    this.$applicant = new BehaviorSubject<Applicant>(this.inquiry.applicant);
    this.$parent = new BehaviorSubject<Parent>(this.inquiry.parent);
    this.children = this.inquiry.children.map(x => new BehaviorSubject<Child>(x));

    if (this.inquiry.applicant) {
      this.$applicantRepresentParentDocument = new BehaviorSubject<ConfirmationDocument>(this.inquiry.applicant.applicantRepresentParentDocument);
    }
    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.countries = data;
      });
    this.$specHealth = of(this.inquiry.specHealth);

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