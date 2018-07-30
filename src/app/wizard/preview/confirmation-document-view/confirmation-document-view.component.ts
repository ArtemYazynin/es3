import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationDocument } from '../../../shared';

@Component({
  selector: 'app-confirmation-document-view',
  templateUrl: './confirmation-document-view.component.html',
  styleUrls: ['./confirmation-document-view.component.css']
})
export class ConfirmationDocumentViewComponent implements OnInit {
  @Input() document: ConfirmationDocument
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
