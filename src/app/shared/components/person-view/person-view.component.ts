import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { ApplicantType } from '../../applicant-type.enum';
import { Applicant, Child, DrawService, Parent } from '../../index';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
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
