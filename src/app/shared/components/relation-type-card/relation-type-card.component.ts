import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { BehaviorMode, CommonService, ConfirmationDocument, InquiryService, Parent, Theme } from '../..';
import { RelationTypeDialogComponent } from '../../../modules/inquiry/relation-type-dialog/relation-type-dialog.component';
import { PersonService } from '../../person.service';

@Component({
  selector: 'app-relation-type-card',
  templateUrl: './relation-type-card.component.html',
  styleUrls: ['./relation-type-card.component.css'],
  host: { 'class': 'host' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationTypeCardComponent implements OnInit, OnDestroy {
  @Input() model: Parent;
  @Input() mode: BehaviorMode;

  private ngUnsubscribe: Subject<any> = new Subject();
  title = "Родственная связь";
  modes = BehaviorMode;
  themes = Theme;
  theme: Theme;
  $parentRepresentChildrenDocument: BehaviorSubject<ConfirmationDocument>;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private cdr: ChangeDetectorRef, private commonService: CommonService,
    private personService: PersonService, private inquiryService: InquiryService) { }

  ngOnInit() {
    this.theme = this.mode == this.modes.Edit ? Theme.Green : Theme.Blue;
    this.$parentRepresentChildrenDocument = new BehaviorSubject<ConfirmationDocument>(this.model.parentRepresentChildrenDocument);
    this.$parentRepresentChildrenDocument
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(doc => {
        this.model.parentRepresentChildrenDocument = doc;
        this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.model);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = { $owner: new BehaviorSubject<Parent>(this.model) };
    config.$owner
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe((person: Parent) => {
        this.personService.update(person.id, person).subscribe((newPerson: Parent) => {
          this.model = newPerson;
          this.$parentRepresentChildrenDocument.next(this.model.parentRepresentChildrenDocument);
          this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.model);
          this.cdr.markForCheck();
        });
      });
    this.dialog.open(RelationTypeDialogComponent, this.commonService.getDialogConfig(config));
  }
}
