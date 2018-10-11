import { Component, Input, OnInit } from '@angular/core';
import { Privilege } from '../..';

@Component({
  selector: 'app-privilege-card',
  templateUrl: './privilege-card.component.html',
  styleUrls: ['./privilege-card.component.css']
})
export class PrivilegeCardComponent implements OnInit {
  @Input() edit: () => void;
  @Input() privilege: Privilege;

  constructor() { }

  ngOnInit() {
  }
}
