import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { AtLeastOneCheckboxShouldBeSelectedComponent } from '../at-least-one-checkbox-should-be-selected/at-least-one-checkbox-should-be-selected.component';

@Component({
  selector: 'app-age-group',
  templateUrl: './age-group.component.html',
  styleUrls: ['./age-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgeGroupComponent implements OnInit {
  @ViewChild(AtLeastOneCheckboxShouldBeSelectedComponent) atLeastOneCheckboxShouldBeSelectedComponent: AtLeastOneCheckboxShouldBeSelectedComponent;
  items = [
    { key: 'IsSearchYoungerAge', text: 'Младшая возрастная группа' },
    { key: 'IsSearchSelfAge', text: 'Своя возрастная группа' },
    { key: 'IsSearchOlderAge', text: 'Старшая возрастная группа' },
  ];
  constructor() { }

  ngOnInit() {
  }
}
