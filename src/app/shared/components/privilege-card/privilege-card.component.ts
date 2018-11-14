import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Privilege, CommonService, ConfirmationDocument, InquiryService, Inquiry } from '../..';
import { BehaviorMode } from '../../behavior-mode.enum';
import { MatDialog } from '@angular/material';
import { PrivilegeDialogComponent } from '../../../modules/inquiry/privilege-dialog/privilege-dialog.component';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { skip, takeUntil, mergeMap, flatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-privilege-card',
  templateUrl: './privilege-card.component.html',
  styleUrls: ['./privilege-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivilegeCardComponent implements OnInit, OnDestroy {
  @Input() mode: BehaviorMode;
  @Input() model: Privilege;

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  title = "Льготная категория";
  $document: BehaviorSubject<ConfirmationDocument>;

  constructor(private dialog: MatDialog, private commonService: CommonService, private cdr: ChangeDetectorRef, private inquiryService: InquiryService, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.$document = new BehaviorSubject<ConfirmationDocument>(this.model ? this.model.privilegeProofDocument : undefined);
    this.$document
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(doc => {
        this.model.privilegeProofDocument = doc;
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
          this.cdr.markForCheck();
        }
        const edit = !!this.model && !!privilege;
        if (edit) {
          /* NOTE: remove privilege AND add privilege(json server don't support update object property) */
          observableInquiry
            .pipe(flatMap(inquiry => updateFn(inquiry, undefined)), 
                  flatMap(inquiry => updateFn(inquiry, privilege)))
            .subscribe(inquiry => subscribeFn(inquiry))
        } else {
          observableInquiry
            .pipe(flatMap(inquiry => updateFn(inquiry, privilege)))
            .subscribe(inquiry => subscribeFn(inquiry))
        }

        if (privilege) this.$document.next(privilege.privilegeProofDocument);

      });
    let config = this.commonService.getDialogConfig(extension);
    this.dialog.open(PrivilegeDialogComponent, config);
  }
}
