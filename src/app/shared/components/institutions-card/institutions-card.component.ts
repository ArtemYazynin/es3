import { Component, Input, OnInit } from '@angular/core';
import { Institution } from '../..';

@Component({
  selector: 'app-institutions-card',
  templateUrl: './institutions-card.component.html',
  styleUrls: ['./institutions-card.component.css']
})
export class InstitutionsCardComponent implements OnInit {
  @Input() edit: () => void;
  @Input() institutions: Array<Institution>;

  constructor() { }

  ngOnInit() {
  }

}
