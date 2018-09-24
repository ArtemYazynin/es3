import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity, Group, GroupService, InstitutionService, SpecHealth } from '../../../../shared';
import { CurrentEducationPlace } from '../../shared';

@Component({
  selector: 'app-preview-current-education-place',
  templateUrl: './preview-current-education-place.component.html',
  styleUrls: ['./preview-current-education-place.component.css']
})
export class PreviewCurrentEducationPlaceComponent implements OnInit {
  @Input() currentEducationPlace: CurrentEducationPlace;

  $group: Observable<Group>;
  $institutionType: Observable<Entity<number>>
  $specHealth: Observable<SpecHealth>

  constructor(private institutionService: InstitutionService, private groupService: GroupService) { }

  ngOnInit() {
    this.$institutionType = this.institutionService.getTypes(this.currentEducationPlace.institutionType)
      .pipe(map(types => types[0]));
    this.$group = this.groupService.getGroup(this.currentEducationPlace.institution, this.currentEducationPlace.group)
      .pipe(map(groups => groups.length > 1 ? null : groups[0]));
  }

}
