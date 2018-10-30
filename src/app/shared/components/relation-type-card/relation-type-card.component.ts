import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Parent, ConfirmationDocumentMode, CommonService, InquiryService } from '../..';
import { Subject, BehaviorSubject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { EditPersonDialogComponent } from '../../../modules/inquiry/edit-person-dialog/edit-person-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PersonService } from '../../person.service';
import { RelationTypeDialogComponent } from '../../../modules/inquiry/relation-type-dialog/relation-type-dialog.component';

@Component({
  selector: 'app-relation-type-card',
  templateUrl: './relation-type-card.component.html',
  styleUrls: ['./relation-type-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationTypeCardComponent implements OnInit, OnDestroy {
  @Input() model: Parent;
  @Input() mode: ConfirmationDocumentMode;

  private ngUnsubscribe: Subject<any> = new Subject();
  title = "Родственная связь";
  modes = ConfirmationDocumentMode;

  constructor(private route: ActivatedRoute,private dialog: MatDialog, private cdr:ChangeDetectorRef, private commonService: CommonService,
    private personService: PersonService, private inquiryService: InquiryService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = { $parent: new BehaviorSubject<Parent>(this.model) };
    config.$parent
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe((person: Parent) => {
        this.personService.update(person).subscribe((newPerson:Parent) => {
          this.model = newPerson;
          this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.model);
          this.cdr.markForCheck();
        });
      });
    this.dialog.open(RelationTypeDialogComponent, this.commonService.getDialogConfig(config));
  }
}
