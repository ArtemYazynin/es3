import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, of, Subject } from "rxjs";
import { skip, takeUntil } from "rxjs/operators";
import { BehaviorMode, CommonService, InquiryInfo, InquiryService, Theme } from "../..";
import { esConstant } from "../../../app.module";
import { InquiryInfoService } from "../../../inquiry-info.service";
import { PreschoolInquiryInfoDialogComponent } from "../../../modules/inquiry/preschool-inquiry-info-dialog/preschool-inquiry-info-dialog.component";
import { WizardStorageService } from "../../../modules/wizard/shared";


@Component({
  selector: 'app-preschool-inquiry-info-card',
  templateUrl: './preschool-inquiry-info-card.component.html',
  styleUrls: ['./preschool-inquiry-info-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreschoolInquiryInfoCardComponent implements OnInit, OnDestroy {
  @Input() mode: BehaviorMode;

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  theme:Theme;
  themes = Theme;
  inquiryInfo: InquiryInfo;

  constructor(private route: ActivatedRoute, private storageService: WizardStorageService, private dialog: MatDialog,
    private commonService: CommonService, private inquiryInfoService: InquiryInfoService, private cdr: ChangeDetectorRef,
    private inquiryService: InquiryService, @Inject(esConstant) public esConstant) { }


  ngOnInit() {
    this.theme = this.mode == this.modes.Edit ? this.themes.Green : this.themes.Blue;
    let observable = this.route.snapshot.data.resolved.inquiryId
      ? this.inquiryInfoService.getByInquiry(this.route.snapshot.data.resolved.inquiryId)
      : of(this.route.snapshot.data.resolved.inquiry.inquiryInfo);

    observable
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(inquiryInfo => {
        this.inquiryInfo = inquiryInfo;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = { $inquiryInfo: new BehaviorSubject<InquiryInfo>(this.inquiryInfo) };
    config.$inquiryInfo
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(inquiryInfo => {
        this.inquiryInfoService.update(inquiryInfo.id, inquiryInfo)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(x => {
            this.inquiryInfo = x;
            this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, x);
            this.cdr.markForCheck();
          });
      })
    this.dialog.open(PreschoolInquiryInfoDialogComponent, this.commonService.getDialogConfig(config));
  }
}
