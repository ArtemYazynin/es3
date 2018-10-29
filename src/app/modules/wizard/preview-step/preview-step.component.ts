import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, timer, zip } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ButtonsTitles, CitizenshipService, ConfigsOfRoutingButtons, Country, DrawService, Entity, Group, Inquiry, InquiryService, inquiryType, SpecHealth, SpecHealthService, ConfirmationDocumentMode, ApplicantType } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { StepBase, WizardStorageService } from '../shared';
import { Guid } from '../../../shared/models/guid';
import { ConfirmationDocumentService } from '../../../shared/confirmation-document.service';
import { PersonType } from '../../../shared/person-type.enum';

@Component({
  selector: 'app-preview-step',
  templateUrl: './preview-step.component.html',
  styleUrls: ['./preview-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewStepComponent implements OnInit, OnDestroy, StepBase {

  constructor(private router: Router, private route: ActivatedRoute, private citizenshipService: CitizenshipService,
    private storageService: WizardStorageService, public drawService: DrawService, private specHealthService: SpecHealthService,
    private inquiryService: InquiryService, public dialog: MatDialog, private confirmationDocumentService: ConfirmationDocumentService, private actionsButtonsService: ActionsButtonsService) { }

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = ConfirmationDocumentMode;
  personTypes = PersonType;
  $group: Observable<Group>;
  $institutionType: Observable<Entity<number>>
  $specHealth: Observable<SpecHealth>
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  parentWidgetSettings: object;

  countries: Array<Country> = [];

  inquiry: Inquiry;
  inquiryTypes = inquiryType;
  applicantTypes = ApplicantType;
  config: ConfigsOfRoutingButtons;
    

  ngOnInit() {
    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.countries = data;
      });

    this.inquiry = this.storageService.get(this.inquiryType);
    this.$specHealth = this.specHealthService.get(this.inquiry.children[0].specHealth)
      .pipe(map(specHealths => specHealths[0]));
    this.parentWidgetSettings = (() => {
      return isNullOrUndefined(this.inquiry.applicant)
        ? { "col-md-12": true }
        : { "col-md-6": true };
    })();

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