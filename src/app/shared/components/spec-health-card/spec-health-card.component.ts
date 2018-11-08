import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, AfterViewInit, Input, ChangeDetectorRef, Inject } from '@angular/core';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { BehaviorMode, Child, SpecHealthService, SpecHealth, InquiryService, Person, CommonService } from '../..';
import { takeUntil, map, skip } from 'rxjs/operators';
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
    this.children.forEach(child => {
      child["$specHealthDocument"] = new BehaviorSubject<ConfirmationDocument>(child.getValue().specHealthDocument);
      child["$specHealthDocument"]
        .pipe(skip(1), takeUntil(this.ngUnsubscribe))
        .subscribe(doc => {
          this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, doc);
          this.cdr.markForCheck();
        });
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(): void {

  }

  edit() {
    // let config = { $parent: new BehaviorSubject<Parent>(this.model) };
    // config.$parent
    //   .pipe(skip(1), takeUntil(this.ngUnsubscribe))
    //   .subscribe((person: Parent) => {
    //     this.personService.update(person).subscribe((newPerson: Parent) => {
    //       this.model = newPerson;
    //       this.$parentRepresentChildrenDocument.next(this.model.parentRepresentChildrenDocument);
    //       this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.model);
    //       this.cdr.markForCheck();
    //     });
    //   });
    let config = {};
    this.dialog.open(SpecHealthDialogComponent, this.commonService.getDialogConfig(config));
  }
}
