import { Component, Input, OnInit } from '@angular/core';
import { SchoolClass } from '../..';

@Component({
  selector: 'app-school-classes-card',
  templateUrl: './school-classes-card.component.html',
  styleUrls: ['./school-classes-card.component.css']
})
export class SchoolClassCardComponent implements OnInit {
  @Input() edit: () => void;
  @Input() schoolClasses: Array<SchoolClass>;
  @Input() IsLearnEducCenter: boolean;

  constructor() { }

  ngOnInit() {
  }

}
