import { Component, OnInit, Input } from '@angular/core';
import { Privilege } from '../../../shared';

@Component({
  selector: 'app-preview-privilege',
  templateUrl: './preview-privilege.component.html',
  styleUrls: ['./preview-privilege.component.css']
})
export class PreviewPrivilegeComponent implements OnInit {
  @Input() privilege: Privilege;
  constructor() { }

  ngOnInit() {
  }

}
