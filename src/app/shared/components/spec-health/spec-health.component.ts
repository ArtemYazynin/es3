import { Component, Input, OnInit, QueryList, ViewChildren, ChangeDetectionStrategy, AfterViewInit, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { EditConfirmationDocumentComponent } from '../edit-confirmation-document/edit-confirmation-document.component';
import { Observable, Subscription } from 'rxjs';
import { ChildComponent } from '../../../modules/wizard/children-step/child/child.component';
import { AttachmentType, SpecHealth, SpecHealthService } from '../../index';
import { esConstant } from '../../../app.module';

@Component({
  selector: 'app-spec-health',
  templateUrl: './spec-health.component.html',
  styleUrls: ['./spec-health.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecHealthComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(EditConfirmationDocumentComponent) documentComponents: QueryList<EditConfirmationDocumentComponent>;
  @Input() childrenComponents: Array<ChildComponent>;
  @Input() specHealth:SpecHealth;

  attachmentType = AttachmentType;
  specHealths: Array<SpecHealth>;
  subscription:Subscription;

  constructor(private specHealthService: SpecHealthService, private cdr:ChangeDetectorRef,
    @Inject(esConstant) private esConstant) { }

  ngOnInit() {
    this.subscription = this.specHealthService.gets().subscribe(specHealths=>{
      this.specHealths = specHealths;
      this.specHealth = this.specHealth 
        ? this.specHealths.find(x=>x.code == this.specHealth.code)
        :  this.specHealths.find(x=>x.code == this.esConstant.noRestrictions);
      setTimeout(() => {
        this.cdr.markForCheck();
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {

  }
}
