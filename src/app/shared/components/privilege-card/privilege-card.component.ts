import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { flatMap, skip, takeUntil } from 'rxjs/operators';
import { CommonService, ConfirmationDocument, Inquiry, InquiryService, Privilege, PrivilegeService, Theme } from '../..';
import { PrivilegeDialogComponent } from '../../../modules/inquiry/privilege-dialog/privilege-dialog.component';
import { BehaviorMode } from '../../behavior-mode.enum';

@Component({
  selector: 'app-privilege-card',
  templateUrl: './privilege-card.component.html',
  styleUrls: ['./privilege-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivilegeCardComponent implements OnInit, OnDestroy {
  @Input() mode: BehaviorMode;

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  theme: Theme;
  themes = Theme;
  title = "Льготная категория";
  $document: BehaviorSubject<ConfirmationDocument>;
  model: Privilege;

  constructor(private dialog: MatDialog, private commonService: CommonService, private cdr: ChangeDetectorRef, private inquiryService: InquiryService,
    private route: ActivatedRoute, private privilegeService: PrivilegeService) { }

  ngOnInit() {
    this.theme = this.mode == this.modes.Edit ? this.themes.Green : this.themes.Blue;
    if (this.route.snapshot.data.resolved.inquiryId) {
      this.privilegeService.getByInquiry(this.route.snapshot.data.resolved.inquiryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(privilege => this.init(privilege));
    } else {
      this.init(this.route.snapshot.data.resolved.inquiry.privilege);
    }
  }

  private init(privilege: Privilege) {
    this.model = privilege;
    this.$document = new BehaviorSubject<ConfirmationDocument>(this.model ? this.model.privilegeProofDocument : undefined);
    this.documentSubscribe(this.$document);
    this.cdr.markForCheck();
  }

  documentSubscribe(document: BehaviorSubject<ConfirmationDocument>): void {
    document
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(doc => {
        this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.model.privilegeProofDocument);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let extension = { $privilege: new BehaviorSubject<Privilege>(this.model) };
    extension.$privilege
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(privilege => {
        const inquiryId = this.route.snapshot.data.resolved.inquiryId;
        let observableInquiry = this.inquiryService.get(inquiryId);
        const updateFn = (inquiry: Inquiry, privilege: Privilege): Observable<Inquiry> => {
          Object.assign(inquiry, { privilege: privilege });
          return this.inquiryService.update(inquiryId, inquiry);
        }
        const subscribeFn = (inquiry: Inquiry) => {
          this.model = inquiry.privilege;
          if (this.model) {
            this.$document = new BehaviorSubject<ConfirmationDocument>(this.model.privilegeProofDocument);
            this.documentSubscribe(this.$document);
            this.$document.next(this.model.privilegeProofDocument);
          }

          this.cdr.markForCheck();
        }
        const edit = !!this.model && !!privilege;
        if (edit) {
          /* NOTE: remove privilege AND add privilege(json server don't support update object property) */
          observableInquiry
            .pipe(flatMap(inquiry => updateFn(inquiry, undefined)),
              flatMap(inquiry => updateFn(inquiry, privilege)))
            .subscribe(inquiry => {
              this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, privilege.privilegeProofDocument);
              subscribeFn(inquiry);
            })
        } else {
          observableInquiry
            .pipe(flatMap(inquiry => updateFn(inquiry, privilege)))
            .subscribe(inquiry => subscribeFn(inquiry))
        }
      });
    let config = this.commonService.getDialogConfig(extension);
    this.dialog.open(PrivilegeDialogComponent, config);
  }
}
