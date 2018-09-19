import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { CitizenshipService, Country, DrawService, Entity, Group, Inquiry, InquiryService, SpecHealth, SpecHealthService } from '../../../shared';
import { StepBase, WizardStorageService } from '../shared';

@Component({
  selector: 'app-preview-step',
  templateUrl: './preview-step.component.html',
  styleUrls: ['./preview-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewStepComponent implements OnInit, OnDestroy, StepBase {

  constructor(private router: Router, private route: ActivatedRoute, private citizenshipService: CitizenshipService,
    private storageService: WizardStorageService, private drawService: DrawService, private specHealthService: SpecHealthService,
    private inquiryService: InquiryService, public dialog: MatDialog) { }
  private ngUnsubscribe: Subject<any> = new Subject();
  $group: Observable<Group>;
  $institutionType: Observable<Entity<number>>
  $specHealth: Observable<SpecHealth>
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  parentWidgetSettings: object;

  countries: Array<Country> = [];

  inquiry: Inquiry;

  goTo = {
    back: () => {
      this.router.navigate(["../fileAttachmentStep"], { relativeTo: this.route });
    },
    next: () => {
      timer(1000).pipe().subscribe((response) => {
        this.inquiry.type = this.inquiryType;
        this.inquiryService.create(this.inquiry).subscribe(inquiry => {
          this.router.navigate([`../registerComplete/${inquiry.id}`], { relativeTo: this.route });
        });
      })
    }
  };
  drawManager = this.drawService
  isValid(): boolean {
    return true;
  }

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
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}