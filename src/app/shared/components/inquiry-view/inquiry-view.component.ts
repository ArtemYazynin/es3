import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { Inquiry, inquiryType, Status, Theme, BehaviorMode, ConfirmationDocument, Applicant, Parent, InquiryService, StatusService, ConfigsOfRoutingButtons, ButtonsTitles } from '../..';
import { PersonType } from '../../person-type.enum';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { takeUntil, skip } from 'rxjs/operators';
import { ActionsButtonsService } from '../../actions-buttons.service';
import { Guid } from '../../models/guid';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-inquiry-view',
  templateUrl: './inquiry-view.component.html',
  styleUrls: ['./inquiry-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquiryViewComponent implements OnInit, OnDestroy {
  $inquiry: BehaviorSubject<Inquiry>;
  config: ConfigsOfRoutingButtons;
  statuses: Array<Status>;
  statusForm: FormGroup;
  $applicantRepresentParentDocument: BehaviorSubject<ConfirmationDocument>;
  $applicant: BehaviorSubject<Applicant>;
  $parent: BehaviorSubject<Parent>;

  private ngUnsubscribe: Subject<any> = new Subject();
  theme: Theme = this.route.snapshot.data.resolved.theme;
  mode: BehaviorMode = this.route.snapshot.data.resolved.mode;
  inquiryTypes = inquiryType;
  personTypes = PersonType;
  themes = Theme;
  modes = BehaviorMode;

  constructor(private route: ActivatedRoute, private inquiryService: InquiryService, private statusService: StatusService,
    private fb: FormBuilder, public dialog: MatDialog, private cdr: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit() {
    if (this.mode == BehaviorMode.Edit) {
      this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(inquiry => {
          this.initCommonBehaviorObjects(inquiry);

          this.cdr.markForCheck();
        });
      this.statusService.get()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(statuses => {
          this.statuses = statuses;
          if (this.statuses.length > 0)
            this.statusForm.controls.status.patchValue(this.statuses[0].id);
        });
    } else {
      let inquiry = this.route.snapshot.data.resolved.inquiry as Inquiry;
      this.initCommonBehaviorObjects(inquiry);
      this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Register, ButtonsTitles.Back,
        () => {
          timer(1000).pipe().subscribe(() => {
            if (!environment.production && !inquiry.currentEducationPlace.id) {
              inquiry.currentEducationPlace.id = Guid.newGuid();
            }
            this.inquiryService.create(inquiry).subscribe(inquiry => {
              this.router.navigate([`../registerComplete/${inquiry.id}`], { relativeTo: this.route });
            });
          })
        },
        () => {
          this.router.navigate(["../fileAttachmentStep"], { relativeTo: this.route });
        }
      );
    }
    this.buildForm();
  }

  private initCommonBehaviorObjects(inquiry: Inquiry) {
    this.$inquiry = new BehaviorSubject<Inquiry>(inquiry);
    this.$applicant = new BehaviorSubject<Applicant>(inquiry.applicant);
    this.$parent = new BehaviorSubject<Parent>(inquiry.parent);
    if (inquiry.applicant && inquiry.applicant.applicantRepresentParentDocument) {
      this.$applicantRepresentParentDocument = new BehaviorSubject<ConfirmationDocument>(inquiry.applicant.applicantRepresentParentDocument);
      this.$applicantRepresentParentDocument
        .pipe(skip(1), takeUntil(this.ngUnsubscribe))
        .subscribe(doc => {
          let inquiry = this.$inquiry.getValue();
          inquiry.applicant.applicantRepresentParentDocument = doc;
          this.inquiryService.updateInquiryPropery(inquiry.id, inquiry.applicant.applicantRepresentParentDocument);
          this.$inquiry.next(inquiry);
          this.cdr.markForCheck();
        });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  changeStatus(status: string) {

  }

  buildForm() {
    this.statusForm = this.fb.group({
      status: ["", []]
    });
  }

}
