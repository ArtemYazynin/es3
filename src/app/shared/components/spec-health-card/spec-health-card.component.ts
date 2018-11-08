import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, AfterViewInit, Input, ChangeDetectorRef, Inject } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { BehaviorMode, Child, SpecHealthService, SpecHealth, InquiryService, Person, CommonService } from '../..';
import { takeUntil, map, skip } from 'rxjs/operators';
import { ConfirmationDocument } from '../../models/confirmation-document.model';
import { ActivatedRoute } from '@angular/router';
import { esConstant } from '../../../app.module';
import { MatDialog } from '@angular/material';
import { SpecHealthDialogComponent } from '../../../modules/inquiry/spec-health-dialog/spec-health-dialog.component';

@Component({
  selector: 'app-spec-health-card',
  templateUrl: './spec-health-card.component.html',
  styleUrls: ['./spec-health-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecHealthCardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() mode: BehaviorMode;
  @Input() children: Array<Child>;
  @Input() specHealth:SpecHealth;

  private ngUnsubscribe: Subject<any> = new Subject();
  model: ScModel;
  modes = BehaviorMode;
  title = "Специализация по здоровью"

  constructor(private specHealthService: SpecHealthService, private inquiryService: InquiryService, private route: ActivatedRoute,
    private cdr: ChangeDetectorRef, @Inject(esConstant) private esConstant,private dialog: MatDialog, private commonService:CommonService) { }

  ngOnInit() {
    let $specHealth = this.specHealthService.gets(this.specHealth.code).pipe(takeUntil(this.ngUnsubscribe), map(x => x[0]));
    this.model = new ScModel($specHealth, (() => {
      let result = [];
      this.children.forEach(child => {
        result.push(this.getScChild(child));
      });
      return result;
    })());


  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(): void {

  }

  edit() {
    // let config = { $parent: new BehaviorSubject<Parent>(this.model) };
    // config.$parent
    //   .pipe(skip(1), takeUntil(this.ngUnsubscribe))
    //   .subscribe((person: Parent) => {
    //     this.personService.update(person).subscribe((newPerson: Parent) => {
    //       this.model = newPerson;
    //       this.$parentRepresentChildrenDocument.next(this.model.parentRepresentChildrenDocument);
    //       this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.model);
    //       this.cdr.markForCheck();
    //     });
    //   });
    let config = {};
    this.dialog.open(SpecHealthDialogComponent, this.commonService.getDialogConfig(config));
  }

  private getScChild(child: Child): ScChild {
    let scChild = new ScChild(child);
    if (this.specHealth.code != this.esConstant.noRestrictions) {
      scChild.$specHealthDocument = new BehaviorSubject<ConfirmationDocument>(child.specHealthDocument);
    }
    scChild.$specHealthDocument
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe(doc => {
        this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, doc);
        this.cdr.markForCheck();
      });
    return scChild;
  }
}

class ScChild extends Person {
  constructor(person: Person, public $specHealthDocument?: BehaviorSubject<ConfirmationDocument>) {
    super(person.lastname, person.firstname, person.middlename, person.snils, person.noMiddlename, person.birthDate, person.birthPlace, person.gender)
  }
}

class ScModel {
  constructor(public $specHealth: Observable<SpecHealth>, public $children: Array<BehaviorSubject<ConfirmationDocument>> = []) {
  }
}
