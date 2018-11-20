import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil, flatMap } from 'rxjs/operators';
import { CommonService, InquiryService, Person } from '../..';
import { EditPetitionDialogComponent } from '../../../modules/inquiry/edit-petition-dialog/edit-petition-dialog.component';
import { WizardStorageService } from '../../../modules/wizard/shared';
import { Petition } from '../../models/petition.model';
import { PersonType } from '../../person-type.enum';
import { BehaviorMode } from './../../behavior-mode.enum';
import { PetitionService } from './../../petition.service.';
import { Guid } from '../../models/guid';

@Component({
  selector: 'app-petition-card',
  templateUrl: './petition-card.component.html',
  styleUrls: ['./petition-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetitionCardComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  $person: BehaviorSubject<Person>;
  petition: Petition;

  constructor(private petitionService: PetitionService, private inquiryService: InquiryService, private route: ActivatedRoute,
    private cdr: ChangeDetectorRef, private dialog: MatDialog, private commonService: CommonService, private storageService: WizardStorageService) { }

  ngOnInit() {
    this.petitionService.getByInquiry(this.route.snapshot.data.resolved.inquiryId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(petition => {
        this.petition = petition;
        if (this.petition && this.petition.person) {
          this.$person = new BehaviorSubject<Person>(this.petition.person);
        }
        this.cdr.markForCheck();
      });
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
            .subscribe(updatedPetition => {
              this.petition = updatedPetition;
              if (this.petition.person && !this.petition.person.id) {
                this.petition.person.id = Guid.newGuid();
              }
              this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.petition);
              this.cdr.markForCheck();
            })
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
                    .subscribe(() => {
                      this.petition = petition;
                      this.cdr.markForCheck();
                    }
                    );
                });
            })
        }
        (function updatePerson(outer) {
          if (outer.petition && outer.petition.person) {
            if (outer.$person)
              outer.$person.next(outer.petition.person);
            else
              outer.$person = new BehaviorSubject<Person>(outer.petition.person);
          }
        })(this);
      })
    this.dialog.open(EditPetitionDialogComponent, this.commonService.getDialogConfig(config));
  }
}
