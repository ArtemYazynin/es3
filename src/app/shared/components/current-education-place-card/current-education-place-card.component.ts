import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity, InstitutionService, SpecHealth } from '../..';
import { CurrentEducationPlace } from '../../../modules/wizard/shared';

@Component({
  selector: 'app-current-education-place-card',
  templateUrl: './current-education-place-card.component.html',
  styleUrls: ['./current-education-place-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentEducationPlaceCardComponent implements OnInit {
  @Input() edit: () => void;
  @Input() currentEducationPlace: CurrentEducationPlace;

  $institutionType: Observable<Entity<number>[]>
  $specHealth: Observable<SpecHealth>

  constructor(private institutionService: InstitutionService) { }

  ngOnInit() {
    this.$institutionType = this.institutionService.getTypes(this.currentEducationPlace.institutionType);
  }
}