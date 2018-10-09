import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Applicant, Parent, Child, DrawService, CitizenshipService, Country } from '../../index';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApplicantType } from '../../applicant-type.enum';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {
  @Input() title: string;
  @Input() entity: Applicant | Parent | Child
  @Input() edit: () => void;

  drawManager = this.drawService;
  applicantType: ApplicantType;

  constructor(private drawService: DrawService) { }

  ngOnInit() {
    this.applicantType = "relationType" in this.entity ? ApplicantType.Parent : ApplicantType.Applicant;
  }


  isChild = () => {
    return ("specHealthDocument" in this.entity) && !isNullOrUndefined(this.entity.specHealthDocument);
  }
}
