import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, AfterViewInit, Input, ChangeDetectorRef, Inject } from '@angular/core';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { BehaviorMode, Child, SpecHealthService, SpecHealth, InquiryService, Person, CommonService, Inquiry } from '../..';
import { takeUntil, map, skip, flatMap } from 'rxjs/operators';
import { ConfirmationDocument } from '../../models/confirmation-document.model';
import { ActivatedRoute } from '@angular/router';
import { esConstant } from '../../../app.module';
import { MatDialog } from '@angular/material';
import { SpecHealthDialogComponent } from '../../../modules/inquiry/spec-health-dialog/spec-health-dialog.component';

@Component({
  selector: 'app-spec-health-card',
  templateUrl: './spec-health-card.component.html',
  styleUrls: ['./spec-health-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecHealthCardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() mode: BehaviorMode;
  @Input() children: Array<BehaviorSubject<Child>>;
  @Input() specHealth: SpecHealth;

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  title = "Специализация по здоровью"
  $specHealth: BehaviorSubject<SpecHealth>;
  constructor(private specHealthService: SpecHealthService, private inquiryService: InquiryService, private route: ActivatedRoute,
    private cdr: ChangeDetectorRef, @Inject(esConstant) private esConstant, private dialog: MatDialog, private commonService: CommonService) { }

  ngOnInit() {
    this.$specHealth = new BehaviorSubject<SpecHealth>(this.specHealth);
    this.children.forEach(x => {
      let child = x.getValue();
      child["$specHealthDocument"] = new BehaviorSubject<ConfirmationDocument>(child.specHealthDocument);
      child["$specHealthDocument"]
        .pipe(skip(1), takeUntil(this.ngUnsubscribe))
        .subscribe(doc => {
          this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, doc);
          this.cdr.markForCheck();
        });
      x = new BehaviorSubject<Child>(child);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(): void {

  }

  edit() {
    let config = { $specHealth: this.$specHealth, $children: this.children };
    config.$specHealth
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(specHealth => {
        const inquiryId = this.route.snapshot.data.resolved.inquiryId;
        const updateFn = (inquiry: Inquiry, sc: SpecHealth): Observable<Inquiry> => {
          Object.assign(inquiry, { specHealth: sc });
          return this.inquiryService.update(inquiryId, inquiry);
        }
        if (this.specHealth.code != specHealth.code) {
          this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId)
            .pipe(flatMap(inquiry => updateFn(inquiry, undefined)),
              flatMap(inquiry => updateFn(inquiry, specHealth)))
            .subscribe(x => {
              setTimeout(() => { this.cdr.markForCheck(); });
            });
        }

      });
    config.$children.forEach(child => {
      child.pipe(skip(1), takeUntil(this.ngUnsubscribe))
        .subscribe(x => {
          let sc = this.$specHealth.getValue();
          if (sc.code == this.esConstant.noRestrictions) {
            x.specHealthDocument = undefined;
          }
          let child = this.children.find(c=>c.getValue().id == x.id);
          let val = child.getValue();
          val["$specHealthDocument"].next(x.specHealthDocument);
          //child["$specHealthDocument"].next(x.specHealthDocument);
          this.cdr.markForCheck();
        })
    });
    this.dialog.open(SpecHealthDialogComponent, this.commonService.getDialogConfig(config));
  }
}
