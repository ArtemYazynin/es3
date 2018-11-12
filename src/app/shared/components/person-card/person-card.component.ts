import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { EditPersonDialogComponent } from '../../../modules/inquiry/edit-person-dialog/edit-person-dialog.component';
import { BehaviorMode } from '../../behavior-mode.enum';
import { CommonService } from '../../common.service';
import { DrawService, Person, ConfirmationDocument, Child } from '../../index';
import { InquiryService } from '../../inquiry.service';
import { PersonType } from '../../person-type.enum';
import { PersonService } from '../../person.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonCardComponent implements OnInit, OnDestroy {
  @Input() entity: BehaviorSubject<Person>;
  @Input() mode: BehaviorMode;
  @Input() personType: PersonType;
  @Input() inquiryType: string;

  modes = BehaviorMode;
  personTypes = PersonType;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(public drawService: DrawService, private dialog: MatDialog, private commonService: CommonService,
    private cdr: ChangeDetectorRef, private inquiryService: InquiryService,
    private route: ActivatedRoute, private personService: PersonService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = { $person: this.entity, personType: this.personType, inquiryType: this.inquiryType };
    config.$person
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe((person: Person) => {
        this.personService.update(person.id,person).subscribe(newPerson => {
          //this.entity = newPerson;
          this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.entity.getValue());
          this.cdr.markForCheck();
        });
      });
    this.dialog.open(EditPersonDialogComponent, this.commonService.getDialogConfig(config));
  }
}
