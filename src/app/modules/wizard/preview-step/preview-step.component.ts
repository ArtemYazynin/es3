import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ApplicantType, ButtonsTitles, CitizenshipService, ConfigsOfRoutingButtons, BehaviorMode, Country, DrawService, Entity, Group, Inquiry, InquiryService, inquiryType, SpecHealth, SpecHealthService, ConfirmationDocument } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { ConfirmationDocumentService } from '../../../shared/confirmation-document.service';
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

  $countryStateApplicantDocument: BehaviorSubject<ConfirmationDocument>;
  $applicantRepresentParentDocument: BehaviorSubject<ConfirmationDocument>;
  $countryStateDocument: BehaviorSubject<ConfirmationDocument>;
  $parentRepresentChildrenDocument: BehaviorSubject<ConfirmationDocument>;

  countries: Array<Country> = [];

  inquiry: Inquiry;
  inquiryTypes = inquiryType;
  applicantTypes = ApplicantType;
  config: ConfigsOfRoutingButtons;


  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
    if (this.inquiry.applicant) {
      this.$countryStateApplicantDocument = new BehaviorSubject<ConfirmationDocument>(this.inquiry.applicant.countryStateApplicantDocument);
      this.$applicantRepresentParentDocument = new BehaviorSubject<ConfirmationDocument>(this.inquiry.applicant.applicantRepresentParentDocument);
    } else if(this.inquiry.parent){
      this.$countryStateDocument = new BehaviorSubject<ConfirmationDocument>(this.inquiry.parent.countryStateDocument);
      this.$parentRepresentChildrenDocument = new BehaviorSubject<ConfirmationDocument>(this.inquiry.parent.parentRepresentChildrenDocument);
    }
    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.countries = data;
      });
    this.$specHealth = this.specHealthService.get(this.inquiry.children[0].specHealth).pipe(takeUntil(this.ngUnsubscribe), map(x=>x[0]));

    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Register, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionPreviewStep(this.inquiry, this.inquiryType, this.router, this.route),
      this.actionsButtonsService.inverseActionPreviewStep(this.router, this.route)
    );
  }

  isValid(): boolean {
    return true;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}