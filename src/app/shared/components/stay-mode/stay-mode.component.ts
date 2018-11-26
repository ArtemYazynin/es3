import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { AtLeastOneCheckboxShouldBeSelectedComponent } from '../at-least-one-checkbox-should-be-selected/at-least-one-checkbox-should-be-selected.component';
import { Theme } from '../..';

@Component({
  selector: 'app-stay-mode',
  templateUrl: './stay-mode.component.html',
  styleUrls: ['./stay-mode.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StayModeComponent implements OnInit {
  @ViewChild(AtLeastOneCheckboxShouldBeSelectedComponent) atLeastOneCheckboxShouldBeSelectedComponent: AtLeastOneCheckboxShouldBeSelectedComponent;
  themes = Theme;
  constructor() { }
  items = [
    { key: 'IsFullStay', text: 'Полный день (10,5-12 часов)' },
    { key: 'IsNightStay', text: 'Круглосуточного пребывания (24 часа)' },
    { key: 'IsShortStay', text: 'Кратковременного пребывания (3-5 часов)' },
    { key: 'IsReducedStay', text: 'Сокращенного дня (8-10 часов)' },
    { key: 'IsExtendedStay', text: 'Продленного дня (13-14 часов)' },
  ];
  ngOnInit() {
  }
}