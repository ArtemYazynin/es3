import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Applicant, Parent, Child, DrawService } from '../../../../shared';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {
  @Input() title: string;
  @Input() entity: Applicant | Parent | Child

  drawManager = this.drawService

  constructor(private drawService: DrawService) { }

  ngOnInit() {
  }

  isChild = ()=>{
    return ('specHealthDocument' in this.entity) && !isNullOrUndefined(this.entity.specHealthDocument);
  }
}
