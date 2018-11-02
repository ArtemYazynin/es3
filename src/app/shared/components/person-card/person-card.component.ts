import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { EditPersonDialogComponent } from '../../../modules/inquiry/edit-person-dialog/edit-person-dialog.component';
import { ApplicantType } from '../../applicant-type.enum';
import { CommonService } from '../../common.service';
import { BehaviorMode } from '../../behavior-mode.enum';
import { DrawService, Person, Inquiry } from '../../index';
import { InquiryService } from '../../inquiry.service';
import { PersonService } from '../../person.service';
import { PersonType } from '../../person-type.enum';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonCardComponent implements OnInit, OnDestroy {
  @Input() entity: Person
  @Input() mode: BehaviorMode;
  @Input() personType: PersonType;

  drawManager = this.drawService;
  modes = BehaviorMode;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private drawService: DrawService, private dialog: MatDialog, private commonService: CommonService, private cdr: ChangeDetectorRef, private inquiryService: InquiryService,
    private route: ActivatedRoute, private personService: PersonService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  // isChild = () => {
  //   return ("specHealthDocument" in this.entity) && !isNullOrUndefined(this.entity.specHealthDocument);
  // }

  edit() {
    let config = { $person: new BehaviorSubject<Person>(this.entity), personType:this.personType };
    config.$person
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe((person: Person) => {
        this.personService.update(person).subscribe(newPerson => {
          this.entity = newPerson;
          this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.entity);
          this.cdr.markForCheck();
        });
      });
    this.dialog.open(EditPersonDialogComponent, this.commonService.getDialogConfig(config));
  }
}
