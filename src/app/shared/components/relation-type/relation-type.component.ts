import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RelationType, RelationTypeService } from '../../index';

@Component({
  selector: 'app-relation-type',
  templateUrl: './relation-type.component.html',
  styleUrls: ['./relation-type.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationTypeComponent implements OnInit, OnDestroy {
  @Input() relationType: RelationType;

  private subscription: Subscription;
  relationTypes: Array<RelationType> = [];

  constructor(private relationTypeService: RelationTypeService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.relationTypeService.get().subscribe(result => {
      this.relationTypes = result;
      if (this.relationType) {
        this.relationType = this.relationTypes.find(x => x.id == this.relationType.id);
        this.cdr.detectChanges();
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
