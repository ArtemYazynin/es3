import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ConfirmationDocument } from '../../../shared';

@Component({
  selector: 'app-confirmation-document-view',
  templateUrl: './confirmation-document-view.component.html',
  styleUrls: ['./confirmation-document-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDocumentViewComponent implements OnInit {
  @Input() document: ConfirmationDocument
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
