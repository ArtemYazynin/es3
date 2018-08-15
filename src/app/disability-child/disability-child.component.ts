import { Component, OnInit, Input } from '@angular/core';
import { ChildComponent } from '../wizard/children-step/child/child.component';
import { inquiryType } from "../shared/inquiry-type"
import { Entity } from '../shared';

@Component({
  selector: 'app-disability-child',
  templateUrl: './disability-child.component.html',
  styleUrls: ['./disability-child.component.css']
})
export class DisabilityChildComponent implements OnInit {
  @Input() inquiryType: string;
  @Input() childrenComponents: Array<ChildComponent>;

  constructor() { }

  inquiryTypes = inquiryType;
  disabilityTypes: Array<Entity<string>>;

  ngOnInit() {
    if (this.inquiryType == this.inquiryTypes.preschool) return;
    this.disabilityTypes = [
      new Entity<string>("", "Нет"),
      new Entity<string>("0", "Ребенок-инвалид"),
      new Entity<string>("1", "1 группа"),
      new Entity<string>("2", "2 группа"),
      new Entity<string>("3", "3 группа"),
    ];
  }

}
