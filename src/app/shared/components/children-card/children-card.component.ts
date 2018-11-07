import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DrawService, Child, Country, CitizenshipService, SpecHealth, BehaviorMode } from '../..';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { PersonType } from '../../person-type.enum';
import { SpecHealthService } from '../../spec-health.service';

@Component({
  selector: 'app-children-card',
  templateUrl: './children-card.component.html',
  styleUrls: ['./children-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenCardComponent implements OnInit {
  @Input() children: Array<Child>;
  @Input() mode: BehaviorMode;
  @Input() inquiryType:string;

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  $specHealth: Observable<SpecHealth>;
  
  personTypes = PersonType;
  constructor(public drawService: DrawService, private specHealthService: SpecHealthService) { }

  ngOnInit() {
    this.$specHealth = this.specHealthService.gets(this.children[0].specHealth).pipe(takeUntil(this.ngUnsubscribe), map(x=>x[0]));
    
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
