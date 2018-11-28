import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BehaviorMode, Child, DrawService, Theme } from '../..';
import { ChildService } from '../../child.service';
import { PersonType } from '../../person-type.enum';
import { WizardStorageService } from '../../../modules/wizard/shared';

@Component({
  selector: 'app-children-card',
  templateUrl: './children-card.component.html',
  styleUrls: ['./children-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenCardComponent implements OnInit {
  @Input() mode: BehaviorMode;
  @Input() inquiryType: string;

  children: Array<Observable<Child>>;
  private ngUnsubscribe: Subject<any> = new Subject();
  personTypes = PersonType;
  modes = BehaviorMode;
  themes = Theme;
  theme: Theme;

  constructor(private route: ActivatedRoute, public drawService: DrawService, private childService: ChildService, private cdr: ChangeDetectorRef,
      private storageService:WizardStorageService) { }

  ngOnInit() {
    this.theme = this.mode == this.modes.Edit ? this.themes.Green : this.themes.Blue;
    if (this.route.snapshot.data.resolved.inquiryId) {
      this.childService.getsByInquiry(this.route.snapshot.data.resolved.inquiryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(children => {
          this.children = children.map(x => new BehaviorSubject<Child>(x));
          this.cdr.markForCheck();
        });
    }else{
      this.children = this.storageService.get(this.inquiryType).children.map(x => new BehaviorSubject<Child>(x));
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
