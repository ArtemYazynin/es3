import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { EditCurrentEducationPlaceDialogComponent } from '../../../modules/inquiry/edit-current-education-place-dialog/edit-current-education-place-dialog.component';
import { WizardStorageService } from '../../../modules/wizard/shared/index';
import { BehaviorMode, CommonService, CurrentEducationPlace, CurrentEducationPlaceService, InquiryService, InstitutionType, Theme, InstitutionTypeService } from '../../index';

@Component({
  selector: 'app-current-education-place-card',
  templateUrl: './current-education-place-card.component.html',
  styleUrls: ['./current-education-place-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentEducationPlaceCardComponent implements OnInit, OnDestroy {
  @Input() inquiryType: string;
  @Input() mode: BehaviorMode;

  private ngUnsubscribe: Subject<any> = new Subject();
  currentEducationPlace: CurrentEducationPlace;
  modes = BehaviorMode;
  theme: Theme;
  themes = Theme;

  title = "Текущее место обучения ребенка";
  $institutionType: Observable<InstitutionType>

  constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private currentEducationPlaceService: CurrentEducationPlaceService, private cdr: ChangeDetectorRef, private institutionTypeService: InstitutionTypeService,
    private storageService: WizardStorageService, private inquiryService: InquiryService, private commonService: CommonService) { }

  ngOnInit() {
    this.theme = this.mode == this.modes.Edit ? this.themes.Green : this.themes.Blue;
    if (this.route.snapshot.data.resolved.inquiryId) {
      this.currentEducationPlaceService.getByInquiry(this.route.snapshot.data.resolved.inquiryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(currentEducationPlace => {
          this.currentEducationPlace = currentEducationPlace;
          this.$institutionType = this.institutionTypeService.get(this.currentEducationPlace.institutionType);
          this.cdr.markForCheck();
        });
    } else {
      this.currentEducationPlace = this.storageService.get(this.inquiryType).currentEducationPlace;
      this.$institutionType = this.institutionTypeService.get(this.currentEducationPlace.institutionType);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = {
      $currentEducationPlace: new BehaviorSubject<CurrentEducationPlace>(this.currentEducationPlace),
      inquiryType: this.inquiryType
    }
    config.$currentEducationPlace
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(currentEducationPlace => {
        this.currentEducationPlaceService.update(currentEducationPlace.id, currentEducationPlace)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(updateCurrentPlace => {
            this.currentEducationPlace = updateCurrentPlace;
            this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, updateCurrentPlace);
            this.cdr.markForCheck();
          })
        this.cdr.markForCheck();
      })
    this.dialog.open(EditCurrentEducationPlaceDialogComponent, this.commonService.getDialogConfig(config));
  }
}