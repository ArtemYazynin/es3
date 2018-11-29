import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { BehaviorMode, CommonService, InquiryService, SchoolClass, Theme } from '../..';
import { EditInstitutionDialogComponent } from '../../../modules/inquiry/edit-preschool-institution-dialog/edit-preschool-institution-dialog.component';
import { WizardStorageService } from '../../../modules/wizard/shared';
import { SchoolClassService } from '../../school-classes.service';

@Component({
  selector: 'app-school-classes-card',
  templateUrl: './school-classes-card.component.html',
  styleUrls: ['./school-classes-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolClassCardComponent implements OnInit {
  @Input() mode: BehaviorMode;
  @Input() inquiryType: string;

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  schoolClasses: Array<SchoolClass>;
  IsLearnEducCenter: boolean;

  constructor(private route: ActivatedRoute, private schoolClassService: SchoolClassService, private cdr: ChangeDetectorRef, private storageService: WizardStorageService,
    private inquiryService: InquiryService, private dialog: MatDialog, private commonService: CommonService) { }

  title = "Предпочитаемые организации"
  theme: Theme;
  themes = Theme;

  ngOnInit() {
    this.theme = this.mode == this.modes.Edit ? this.themes.Green : this.themes.Blue;
    if (this.route.snapshot.data.resolved.inquiryId) {
      this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(inquiry => {
          this.schoolClasses = inquiry.schoolClasses;
          this.IsLearnEducCenter = inquiry.IsLearnEducCenter;
          this.cdr.markForCheck();
        });

    } else {
      let inquiry = this.storageService.get(this.inquiryType);
      this.schoolClasses = inquiry.schoolClasses;
      this.IsLearnEducCenter = inquiry.IsLearnEducCenter;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = {
      $configSubject: new BehaviorSubject({
        institutions: this.schoolClasses,
        IsLearnEducCenter: this.IsLearnEducCenter
      }),
      inquiryType: this.inquiryType
    }

    config.$configSubject
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(config => {
        this.schoolClasses = config.institutions;
        this.IsLearnEducCenter = config.IsLearnEducCenter;

        this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(inquiry => {
            inquiry.schoolClasses = this.schoolClasses;
            inquiry.IsLearnEducCenter = this.IsLearnEducCenter;
            this.inquiryService.update(inquiry.id, inquiry).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
            this.cdr.markForCheck();
          });
      })

    this.dialog.open(EditInstitutionDialogComponent, this.commonService.getDialogConfig(config));

  }
}
