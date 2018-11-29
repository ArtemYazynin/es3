import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { BehaviorMode, CommonService, InquiryService, Institution, SchoolClass, Theme } from '../..';
import { EditInstitutionDialogComponent } from '../../../modules/inquiry/edit-preschool-institution-dialog/edit-preschool-institution-dialog.component';
import { WizardStorageService } from '../../../modules/wizard/shared';
import { InstitutionService } from '../../institution.service';


@Component({
  selector: 'app-institutions-card',
  templateUrl: './institutions-card.component.html',
  styleUrls: ['./institutions-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstitutionsCardComponent implements OnInit {
  @Input() mode: BehaviorMode;
  @Input() inquiryType: string;

  private ngUnsubscribe: Subject<any> = new Subject();
  institutions: Array<Institution>;
  IsLearnEducCenter: boolean;
  schoolClasses: Array<SchoolClass>;
  modes = BehaviorMode;

  constructor(private route: ActivatedRoute, private institutionsService: InstitutionService, private cdr: ChangeDetectorRef, private storageService: WizardStorageService,
    private inquiryService: InquiryService, private dialog: MatDialog, private commonService: CommonService) { }

  title = "Предпочитаемые организации"
  theme: Theme;
  themes = Theme;


  ngOnInit() {
    this.theme = this.mode == this.modes.Edit ? this.themes.Green : this.themes.Blue;
    if (this.route.snapshot.data.resolved.inquiryId) {
      this.institutionsService.getByInquiry(this.route.snapshot.data.resolved.inquiryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(institutions => {
          this.institutions = institutions;
          this.cdr.markForCheck();
        });
    } else {
      this.institutions = this.storageService.get(this.inquiryType).institutions;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = {
      $configSubject: new BehaviorSubject({
        institutions: this.institutions,
        IsLearnEducCenter: undefined
      }),
      inquiryType: this.inquiryType
    }

    config.$configSubject
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(config => {
        this.institutions = config.institutions;
        this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(inquiry => {
            inquiry.institutions = this.institutions;
            this.inquiryService.update(inquiry.id, inquiry).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
            this.cdr.markForCheck();
          });
      })
    this.dialog.open(EditInstitutionDialogComponent, this.commonService.getDialogConfig(config));
  }
}