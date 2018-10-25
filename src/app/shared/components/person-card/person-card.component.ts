import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { EditPersonDialogComponent } from '../../../modules/inquiry/edit-person-dialog/edit-person-dialog.component';
import { ApplicantType } from '../../applicant-type.enum';
import { CommonService } from '../../common.service';
import { ConfirmationDocumentMode } from '../../confirmation-document-mode.enum';
import { DrawService, Person, Inquiry } from '../../index';
import { InquiryService } from '../../inquiry.service';
import { PersonService } from '../../person.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonCardComponent implements OnInit, OnDestroy {
  @Input() entity: Person
  @Input() mode: ConfirmationDocumentMode;

  drawManager = this.drawService;
  applicantType: ApplicantType;
  modes = ConfirmationDocumentMode;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private drawService: DrawService, private dialog: MatDialog, private commonService: CommonService, private cdr: ChangeDetectorRef, private inquiryService: InquiryService,
    private route: ActivatedRoute, private personService: PersonService) { }

  ngOnInit() {
    this.applicantType = "relationType" in this.entity ? ApplicantType.Parent : ApplicantType.Applicant;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  // isChild = () => {
  //   return ("specHealthDocument" in this.entity) && !isNullOrUndefined(this.entity.specHealthDocument);
  // }

  edit() {
    let config = { $person: new BehaviorSubject<Person>(this.entity) };
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
