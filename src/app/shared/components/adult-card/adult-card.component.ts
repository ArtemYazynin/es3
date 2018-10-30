import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Applicant, Child, CitizenshipService, Country, DrawService, Parent, ConfirmationDocument, ConfirmationDocumentMode } from '../..';
import { EditConfirmationDocumentDialogComponent } from '../../../modules/inquiry/edit-confirmation-document-dialog/edit-confirmation-document-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-adult-card',
  templateUrl: './adult-card.component.html',
  styleUrls: ['./adult-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdultCardComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() entity: Applicant | Parent | Child;
  @Input() edit: () => void;

  private ngUnsubscribe: Subject<any> = new Subject();
  countries: Array<Country> = [];
  mode: ConfirmationDocumentMode;
  constructor(public drawService: DrawService, private citizenshipService: CitizenshipService,  ) { }

  ngOnInit() {
    this.mode = this.edit ? ConfirmationDocumentMode.Edit : ConfirmationDocumentMode.Read;
    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.countries = data;
      });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
