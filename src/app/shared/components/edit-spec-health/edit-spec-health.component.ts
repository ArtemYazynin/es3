import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Inject, OnDestroy, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { BehaviorMode } from '../../behavior-mode.enum';
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';
import { SpecHealth, Child, SpecHealthService, AttachmentType } from '../../index';
import { esConstant } from '../../../app.module';
import { takeUntil, flatMap } from 'rxjs/operators';
import { EditConfirmationDocumentComponent } from '../edit-confirmation-document/edit-confirmation-document.component';

@Component({
  selector: 'app-edit-spec-health',
  templateUrl: './edit-spec-health.component.html',
  styleUrls: ['./edit-spec-health.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSpecHealthComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() $specHealth: BehaviorSubject<SpecHealth>;
  @Input() children: Array<BehaviorSubject<Child>>
  @ViewChildren(EditConfirmationDocumentComponent) editConfirmationDocimentComponents: QueryList<EditConfirmationDocumentComponent>;

  private ngUnsubscribe: Subject<any> = new Subject();
  attachmentType = AttachmentType;
  specHealths: Array<SpecHealth>;
  specHealth: SpecHealth;

  constructor(private specHealthService: SpecHealthService, private cdr: ChangeDetectorRef,
    @Inject(esConstant) public esConstant) { }

  ngOnInit() {
    this.specHealthService.gets()
      .pipe(takeUntil(this.ngUnsubscribe), flatMap(data => {
        this.specHealths = data;
        return this.$specHealth;
      }))
      .subscribe(sc => {
        this.specHealth = this.specHealths.find(x => x.code == sc.code);
        setTimeout(() => {
          this.cdr.markForCheck();
        });
      });
  }

  ngAfterViewInit(): void {
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
