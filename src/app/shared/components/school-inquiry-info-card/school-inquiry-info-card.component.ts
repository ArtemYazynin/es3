import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SchoolInquiryInfo, CommonService, InquiryService, BehaviorMode } from '../../index';
import { ActivatedRoute } from '@angular/router';
import { WizardStorageService } from '../../../modules/wizard/shared';
import { MatDialog } from '@angular/material';
import { ContactInfoService } from '../../contact-info.service';
import { SchoolInquiryInfoDialogComponent } from '../../../modules/inquiry/school-inquiry-info-dialog/school-inquiry-info-dialog.component';
import { SchoolInquiryInfoService } from '../../school-inquiry-info.service';
import { takeUntil, skip } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

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
  title = "Параметры заявления";
  schoolInquiryInfo: SchoolInquiryInfo;

  constructor(private route: ActivatedRoute, private storageService: WizardStorageService, private dialog: MatDialog,
    private commonService: CommonService, private schoolInquiryInfoService: SchoolInquiryInfoService, private cdr: ChangeDetectorRef,
    private inquiryService: InquiryService) { }

  ngOnInit() {
    if (this.route.snapshot.data.resolved.inquiryId) {
      this.schoolInquiryInfoService.getByInquiry(this.route.snapshot.data.resolved.inquiryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(schoolInquiryInfo => {
          this.schoolInquiryInfo = schoolInquiryInfo;
          this.cdr.markForCheck();
        });
    } else {
      this.schoolInquiryInfo = this.storageService.get(this.route.snapshot.data.resolved.inquiryType).schoolInquiryInfo;
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
