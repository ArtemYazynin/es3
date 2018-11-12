import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ApplicantType, BehaviorMode, ButtonsTitles, CitizenshipService, ConfigsOfRoutingButtons, ConfirmationDocument, Country, DrawService, Entity, Group, InquiryRequest, inquiryType, SpecHealth, SpecHealthService, Child, Applicant, Parent, CountryService } from '../../../shared';
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
    public dialog: MatDialog, private actionsButtonsService: ActionsButtonsService, private countryService:CountryService) { }

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  personTypes = PersonType;
  $group: Observable<Group>;
  $institutionType: Observable<Entity<number>>
  $specHealth: Observable<SpecHealth>
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  $applicantRepresentParentDocument: BehaviorSubject<ConfirmationDocument>;
  countries: Array<Country> = [];
  inquiry: InquiryRequest;
  inquiryTypes = inquiryType;
  applicantTypes = ApplicantType;
  config: ConfigsOfRoutingButtons;

  children: Array<BehaviorSubject<Child>> = [];
  $applicant:BehaviorSubject<Applicant>;
  $parent: BehaviorSubject<Parent>;

  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
    this.$applicant = new BehaviorSubject<Applicant>(this.inquiry.applicant);
    this.$parent = new BehaviorSubject<Parent>(this.inquiry.parent);
    this.children = this.inquiry.children.map(x=>new BehaviorSubject<Child>(x));

    if (this.inquiry.applicant) {
      this.$applicantRepresentParentDocument = new BehaviorSubject<ConfirmationDocument>(this.inquiry.applicant.applicantRepresentParentDocument);
    }
    this.countryService.gets()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.countries = data;
      });
    this.$specHealth = of(this.inquiry.specHealth);

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