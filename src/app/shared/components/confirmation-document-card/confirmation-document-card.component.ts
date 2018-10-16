import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { ConfirmationDocument, InquiryService } from '../..';
import { EditConfirmationDocumentDialogComponent } from '../../../modules/inquiry/edit-confirmation-document-dialog/edit-confirmation-document-dialog.component';
import { ConfirmationDocumentMode } from '../../confirmation-document-mode.enum';
import { ConfirmationDocumentService } from '../../confirmation-document.service';

@Component({
  selector: 'app-confirmation-document-card',
  templateUrl: './confirmation-document-card.component.html',
  styleUrls: ['./confirmation-document-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDocumentCardComponent implements OnInit, OnDestroy {
  @Input() model: ConfirmationDocument
  @Input() title: string;
  @Input() mode: ConfirmationDocumentMode;

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = ConfirmationDocumentMode;
  constructor(public dialog: MatDialog, private confirmationDocumentService: ConfirmationDocumentService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private inquiryService: InquiryService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private getDefaultConfig = (obj?: object) => {
    let config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "1000px";
    config.data = {};
    if (obj) Object.assign(config.data, obj);

    return config;
  }
  editConfirmationDocument() {
    const config = { $document: new BehaviorSubject<ConfirmationDocument>(this.model) };
    config.$document
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe((doc: ConfirmationDocument) => {
        this.confirmationDocumentService.update(doc).subscribe(newDoc => {
          this.model = newDoc;
          this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.model);
          this.cdr.markForCheck();
        });
      });
    this.dialog.open(EditConfirmationDocumentDialogComponent, this.getDefaultConfig(config));
  }
}
