import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, of, Subject, empty } from "rxjs";
import { flatMap, map, skip, takeUntil } from "rxjs/operators";
import { BehaviorMode, CommonService, InquiryInfo, InquiryService, Specificity, SpecificityService } from "../..";
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
  inquiryInfo: InquiryInfo;
  specificity: Specificity

  constructor(private specificityService: SpecificityService, private route: ActivatedRoute, private storageService: WizardStorageService, private dialog: MatDialog,
    private commonService: CommonService, private inquiryInfoService: InquiryInfoService, private cdr: ChangeDetectorRef,
    private inquiryService: InquiryService, @Inject(esConstant) public esConstant) { }


  ngOnInit() {
    let observable = this.route.snapshot.data.resolved.inquiryId
      ? this.inquiryInfoService.getByInquiry(this.route.snapshot.data.resolved.inquiryId)
      : of(this.storageService.get(this.route.snapshot.data.resolved.inquiryType).inquiryInfo);

    observable
      .pipe(flatMap(inquiryInfo => {
        this.inquiryInfo = inquiryInfo;
        if (inquiryInfo.distributionParams.specificity) {
          return this.specificityService.get(inquiryInfo.distributionParams.specificity).pipe(map((specificity: any) => specificity));
        } else {
          return of(undefined);
        }

      }), takeUntil(this.ngUnsubscribe))
      .subscribe(specificity => {
        this.specificity = specificity;
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
