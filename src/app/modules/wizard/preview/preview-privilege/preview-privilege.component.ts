import { Component, Input, OnInit } from '@angular/core';
import { Privilege, ConfirmationDocumentMode } from '../../../../shared';

@Component({
  selector: 'app-preview-privilege',
  templateUrl: './preview-privilege.component.html',
  styleUrls: ['./preview-privilege.component.css']
})
export class PreviewPrivilegeComponent implements OnInit {
  @Input() privilege: Privilege;
  visibility: boolean = false;
  mode = ConfirmationDocumentMode;
  constructor() { }
  ngOnInit() {
    this.visibility = this.privilege && Object.keys(this.privilege).length > 0
  }
}
