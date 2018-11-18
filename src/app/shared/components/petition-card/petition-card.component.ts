import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { CommonService, InquiryService, Person } from '../..';
import { EditPetitionDialogComponent } from '../../../modules/inquiry/edit-petition-dialog/edit-petition-dialog.component';
import { WizardStorageService } from '../../../modules/wizard/shared';
import { Petition } from '../../models/petition.model';
import { PersonType } from '../../person-type.enum';
import { BehaviorMode } from './../../behavior-mode.enum';
import { PetitionService } from './../../petition.service.';

@Component({
  selector: 'app-petition-card',
  templateUrl: './petition-card.component.html',
  styleUrls: ['./petition-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetitionCardComponent implements OnInit {

  private ngUnsubscribe: Subject<any> = new Subject();
  personTypes = PersonType;
  modes = BehaviorMode;
  $person: BehaviorSubject<Person>;
  petition: Petition;

  constructor(private petitionService: PetitionService, private inquiryService: InquiryService, private route: ActivatedRoute,
    private cdr: ChangeDetectorRef, private dialog: MatDialog, private commonService: CommonService, private storageService: WizardStorageService) { }

  ngOnInit() {
    if (this.route.snapshot.data.resolved.inquiryId) {
      this.petitionService.getByInquiry(this.route.snapshot.data.resolved.inquiryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(petition => {
          this.petition = petition;
          if (this.petition && this.petition.person) {
            this.$person = new BehaviorSubject<Person>(this.petition.person);
          }
          this.cdr.markForCheck();
        });
    } else {
      this.petition = this.storageService.get(this.route.snapshot.data.resolved.inquiryType).petition;
      if (this.petition && this.petition.person) {
        this.$person = new BehaviorSubject<Person>(this.petition.person);
        this.cdr.markForCheck();
      }
    }

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = { $petition: new BehaviorSubject<Petition>(this.petition) }
    config.$petition
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(petition => {
        if (this.petition.id) {
          this.petitionService.update(petition.id, petition)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(x => {
              this.petition = x;
              this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, x);
              this.cdr.markForCheck();
            })
          if (this.petition && this.petition.person) {
            if (this.$person)
              this.$person.next(this.petition.person);
            else
              this.$person = new BehaviorSubject<Person>(this.petition.person);

            this.cdr.markForCheck();
          }
        }
        else {
          this.petitionService.create(petition)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(petition => {
              this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId)
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(inq => {
                  Object.assign(inq, { petition: petition });
                  this.inquiryService.update(inq.id, inq)
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe(inquiry => {
                      this.petition = petition;
                      this.cdr.markForCheck();
                    }
                    );
                })
              this.cdr.markForCheck();
            })
          if (this.petition && this.petition.person) {
            if (this.$person)
              this.$person.next(this.petition.person);
            else
              this.$person = new BehaviorSubject<Person>(this.petition.person);

            this.cdr.markForCheck();
          }
        }
      })
    this.dialog.open(EditPetitionDialogComponent, this.commonService.getDialogConfig(config));
  }
}
