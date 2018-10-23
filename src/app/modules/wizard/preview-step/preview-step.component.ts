import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, timer, zip } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ButtonsTitles, CitizenshipService, ConfigsOfRoutingButtons, Country, DrawService, Entity, Group, Inquiry, InquiryService, inquiryType, SpecHealth, SpecHealthService } from '../../../shared';
import { StepBase, WizardStorageService } from '../shared';
import { Guid } from '../../../shared/models/guid';
import { ConfirmationDocumentService } from '../../../shared/confirmation-document.service';

@Component({
  selector: 'app-preview-step',
  templateUrl: './preview-step.component.html',
  styleUrls: ['./preview-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewStepComponent implements OnInit, OnDestroy, StepBase {

  constructor(private router: Router, private route: ActivatedRoute, private citizenshipService: CitizenshipService,
    private storageService: WizardStorageService, public drawService: DrawService, private specHealthService: SpecHealthService,
    private inquiryService: InquiryService, public dialog: MatDialog, private confirmationDocumentService: ConfirmationDocumentService) { }

  private ngUnsubscribe: Subject<any> = new Subject();
  $group: Observable<Group>;
  $institutionType: Observable<Entity<number>>
  $specHealth: Observable<SpecHealth>
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  parentWidgetSettings: object;

  countries: Array<Country> = [];

  inquiry: Inquiry;
  inquiryTypes = inquiryType;
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
      () => {
        timer(1000).pipe().subscribe((response) => {
          this.inquiry.type = this.inquiryType;
          this.inquiryService.create(this.inquiry).subscribe(inquiry => {
            this.router.navigate([`../registerComplete/${inquiry.id}`], { relativeTo: this.route });
          });
        })
      },
      () => {
        this.router.navigate(["../fileAttachmentStep"], { relativeTo: this.route });
      }
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