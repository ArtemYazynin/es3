import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { esConstant } from '../../../app.module';
import { SchoolInquiryInfoDialogComponent } from '../../../modules/inquiry/school-inquiry-info-dialog/school-inquiry-info-dialog.component';
import { WizardStorageService } from '../../../modules/wizard/shared';
import { BehaviorMode, CommonService, InquiryService, SchoolInquiryInfo, Theme } from '../../index';
import { SchoolInquiryInfoService } from '../../school-inquiry-info.service';

@Component({
  selector: 'app-school-inquiry-info-card',
  templateUrl: './school-inquiry-info-card.component.html',
  styleUrls: ['./school-inquiry-info-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolInquiryInfoCardComponent implements OnInit, OnDestroy {
  @Input() mode: BehaviorMode;

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  schoolInquiryInfo: SchoolInquiryInfo;

  themes = Theme;

  constructor(private route: ActivatedRoute, private storageService: WizardStorageService, private dialog: MatDialog,
    private commonService: CommonService, private schoolInquiryInfoService: SchoolInquiryInfoService, private cdr: ChangeDetectorRef,
    private inquiryService: InquiryService, @Inject(esConstant) public esConstant) { }

  ngOnInit() {
    if (this.route.snapshot.data.resolved.inquiryId) {
      this.schoolInquiryInfoService.getByInquiry(this.route.snapshot.data.resolved.inquiryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(schoolInquiryInfo => {
          this.schoolInquiryInfo = schoolInquiryInfo;
          this.cdr.markForCheck();
        });
    } else {
      this.schoolInquiryInfo = this.route.snapshot.data.resolved.inquiry.schoolInquiryInfo;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = { $schoolInquiryInfo: new BehaviorSubject<SchoolInquiryInfo>(this.schoolInquiryInfo) };
    config.$schoolInquiryInfo
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(schoolInquiryInfo => {
        this.schoolInquiryInfoService.update(schoolInquiryInfo.id, schoolInquiryInfo)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(x => {
            this.schoolInquiryInfo = x;
            this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, x);
            this.cdr.markForCheck();
          });
      })
    this.dialog.open(SchoolInquiryInfoDialogComponent, this.commonService.getDialogConfig(config));
  }
}
