import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Institution, Theme } from '../..';

@Component({
  selector: 'app-institutions-card',
  templateUrl: './institutions-card.component.html',
  styleUrls: ['./institutions-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstitutionsCardComponent implements OnInit {
  @Input() edit: () => void;
  @Input() institutions: Array<Institution>;

  title="Предпочитаемые организации"
  theme: Theme;
  themes = Theme;

  constructor() { }

  ngOnInit() {
    this.theme = this.edit ? this.themes.Read : this.themes.Preview;
  }

}
