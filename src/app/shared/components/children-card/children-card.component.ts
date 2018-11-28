import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { BehaviorMode, Child, DrawService, Theme } from '../..';
import { PersonType } from '../../person-type.enum';
import { SpecHealthService } from '../../spec-health.service';
import { SpecHealth } from '../../models/spec-health.model';

@Component({
  selector: 'app-children-card',
  templateUrl: './children-card.component.html',
  styleUrls: ['./children-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenCardComponent implements OnInit {
  @Input() children: Array<Observable<Child>>;
  @Input() mode: BehaviorMode;
  @Input() inquiryType:string;
  @Input() specHealth: SpecHealth;

  private ngUnsubscribe: Subject<any> = new Subject();
  personTypes = PersonType;
  modes = BehaviorMode;
  themes = Theme;
  theme:Theme;

  constructor(public drawService: DrawService) { }

  ngOnInit() {
    this.theme = this.mode == this.modes.Edit ? this.themes.Green : this.themes.Blue;
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
