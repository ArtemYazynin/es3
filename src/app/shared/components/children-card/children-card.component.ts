import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { BehaviorMode, Child, DrawService } from '../..';
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
  personTypes = PersonType;

  constructor(public drawService: DrawService) { }

  ngOnInit() {
    
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
