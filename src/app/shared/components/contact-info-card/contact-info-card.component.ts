import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { BehaviorMode, CommonService, InquiryService, Theme } from '../..';
import { ContactInfoDialogComponent } from '../../../modules/inquiry/contact-info-dialog/contact-info-dialog.component';
import { ContactInfo, WizardStorageService } from '../../../modules/wizard/shared';
import { ContactInfoService } from '../../contact-info.service';

@Component({
  selector: 'app-contact-info-card',
  templateUrl: './contact-info-card.component.html',
  styleUrls: ['./contact-info-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoCardComponent implements OnInit, OnDestroy {

  @Input() mode: BehaviorMode;

  private ngUnsubscribe: Subject<any> = new Subject();
  title="Контактные данные"
  modes = BehaviorMode;
  theme: Theme;
  themes = Theme;
  contactInfo: ContactInfo;

  constructor(private route: ActivatedRoute, private storageService: WizardStorageService, private dialog: MatDialog,
    private commonService: CommonService, private contactInfoService: ContactInfoService, private cdr: ChangeDetectorRef,
    private inquiryService: InquiryService) { }

  ngOnInit() {
    this.theme = this.mode == this.modes.Edit ? this.themes.Read : this.themes.Preview;
    if (this.route.snapshot.data.resolved.inquiryId) {
      this.contactInfoService.getByInquiry(this.route.snapshot.data.resolved.inquiryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(contactInfo => {
          this.contactInfo = contactInfo;
          this.cdr.markForCheck();
        });
    } else {
      this.contactInfo = this.storageService.get(this.route.snapshot.data.resolved.inquiryType).contactInfo;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = { $contactInfo: new BehaviorSubject<ContactInfo>(this.contactInfo) }
    config.$contactInfo
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(contactInfo => {
        this.contactInfoService.update(contactInfo.id, contactInfo)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(x => {
            this.contactInfo = x;
            this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, x);
            this.cdr.markForCheck();
          });

      })
    this.dialog.open(ContactInfoDialogComponent, this.commonService.getDialogConfig(config));
  }
}
