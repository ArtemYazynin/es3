import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConfigsOfRoutingButtons } from '../../../shared';

@Component({
  selector: 'app-dialog-buttons',
  templateUrl: './dialog-buttons.component.html',
  styleUrls: ['./dialog-buttons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogButtonsComponent implements OnInit {
  @Input() config: ConfigsOfRoutingButtons;
  @Input() isValid: boolean;
  constructor() { }

  ngOnInit() {
    this.config.primaryTitle = this.config.primaryTitle ? this.config.primaryTitle : "Сохранить изменения";
    this.config.inverseTitle = this.config.inverseTitle ? this.config.inverseTitle : "Закрыть";
  }
}
