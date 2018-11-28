import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { Applicant, BehaviorMode, CommonService, ConfirmationDocument, Inquiry, InquiryService, inquiryType, Parent, Status, StatusService, Theme } from '../../../shared/index';
import { PersonType } from '../../../shared/person-type.enum';

@Component({
  selector: 'app-inquiry-read',
  templateUrl: './inquiry-read.component.html',
  styleUrls: ['./inquiry-read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquiryReadComponent implements OnInit, OnDestroy {
  $inquiry: BehaviorSubject<Inquiry>;
  private ngUnsubscribe: Subject<any> = new Subject();
  inquiryTypes = inquiryType;
  personTypes = PersonType;
  statuses: Array<Status>;
  themes = Theme;
  statusForm: FormGroup;
  modes = BehaviorMode;
  $applicantRepresentParentDocument: BehaviorSubject<ConfirmationDocument>;
  $applicant: BehaviorSubject<Applicant>;
  $parent: BehaviorSubject<Parent>;

  constructor(private route: ActivatedRoute, private inquiryService: InquiryService, private statusService: StatusService,
    private fb: FormBuilder, public dialog: MatDialog, private cdr: ChangeDetectorRef, private commonService: CommonService) { }

  ngOnInit() {
    this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(inquiry => {
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
        this.cdr.markForCheck();
      });
    this.statusService.get()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(statuses => {
        this.statuses = statuses;
        if (this.statuses.length > 0)
          this.statusForm.controls.status.patchValue(this.statuses[0].id);
      });

    this.buildForm();
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
