import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { ConfirmationDocument, InquiryService } from '../..';
import { EditConfirmationDocumentDialogComponent } from '../../../modules/inquiry/edit-confirmation-document-dialog/edit-confirmation-document-dialog.component';
import { CommonService } from '../../common.service';
import { BehaviorMode } from '../../behavior-mode.enum';
import { ConfirmationDocumentService } from '../../confirmation-document.service';

@Component({
  selector: 'app-confirmation-document-card',
  templateUrl: './confirmation-document-card.component.html',
  styleUrls: ['./confirmation-document-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDocumentCardComponent implements OnInit, OnDestroy {
  @Input() model: BehaviorSubject<ConfirmationDocument>;
  @Input() title: string;
  @Input() mode: BehaviorMode;

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  constructor(public dialog: MatDialog, private confirmationDocumentService: ConfirmationDocumentService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private inquiryService: InquiryService,
    private commonService: CommonService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  editConfirmationDocument() {
    const config = { $document: new BehaviorSubject<ConfirmationDocument>(this.model.getValue()) };
    config.$document
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe((doc: ConfirmationDocument) => {
        this.confirmationDocumentService.update(doc.id,doc).subscribe(newDoc => {
          this.model.next(newDoc);
        });
      });
    this.dialog.open(EditConfirmationDocumentDialogComponent, this.commonService.getDialogConfig(config));
  }
}
