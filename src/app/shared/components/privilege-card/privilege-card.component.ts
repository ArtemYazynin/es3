import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Privilege } from '../..';
import { ConfirmationDocumentMode } from '../../confirmation-document-mode.enum';

@Component({
  selector: 'app-privilege-card',
  templateUrl: './privilege-card.component.html',
  styleUrls: ['./privilege-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivilegeCardComponent implements OnInit {
  @Input() edit: () => void;
  @Input() privilege: Privilege;

  modes = ConfirmationDocumentMode;
  constructor() { }

  ngOnInit() {
  }
}
