import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ConfirmationDocument } from '../..';
import { BehaviorSubject } from 'rxjs';
import { EditConfirmationDocumentDialogComponent } from '../../../modules/inquiry/edit-confirmation-document-dialog/edit-confirmation-document-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmationDocumentMode } from '../../confirmation-document-mode.enum';

@Component({
  selector: 'app-confirmation-document-card',
  templateUrl: './confirmation-document-card.component.html',
  styleUrls: ['./confirmation-document-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDocumentCardComponent implements OnInit {
  @Input() document: ConfirmationDocument
  @Input() title: string;
  @Input() mode: ConfirmationDocumentMode;

  constructor(public dialog: MatDialog,) { }

  ngOnInit() {
  }
  private getDefaultConfig = (obj?: object) => {
    let config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.data = { };
    if (obj) {
      Object.assign(obj, config.data);
    }
    config.width = "1000px";
    return config;
  }
  editConfirmationDocument() {
    const config = { $document: new BehaviorSubject<ConfirmationDocument>(this.document) };
    this.dialog.open(EditConfirmationDocumentDialogComponent, this.getDefaultConfig(config));
  }
}
