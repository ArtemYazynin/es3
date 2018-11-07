import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { BehaviorMode, Child, SpecHealthService, SpecHealth, InquiryService } from '../..';
import { takeUntil, map, skip } from 'rxjs/operators';
import { ConfirmationDocument } from '../../models/confirmation-document.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spec-health-card',
  templateUrl: './spec-health-card.component.html',
  styleUrls: ['./spec-health-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecHealthCardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() mode: BehaviorMode;
  @Input() code: number;
  @Input() document: ConfirmationDocument;

  $model: Observable<SpecHealth>;
  $document: BehaviorSubject<ConfirmationDocument>;
  modes = BehaviorMode;
  private ngUnsubscribe: Subject<any> = new Subject();
  title = "Специализация по здоровью"
  constructor(private specHealthService: SpecHealthService, private inquiryService: InquiryService,private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.$model = this.specHealthService.gets(this.code).pipe(takeUntil(this.ngUnsubscribe), map(x => x[0]));
    if (this.document) {
      this.$document = new BehaviorSubject<ConfirmationDocument>(this.document);
      this.$document
        .pipe(skip(1), takeUntil(this.ngUnsubscribe))
        .subscribe(doc => {
          this.document = doc;
          this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.document);
          this.cdr.markForCheck();
        });
    }

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(): void {

  }

  edit() {

  }
}
