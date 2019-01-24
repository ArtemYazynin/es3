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
  static get defaultSave() { return "Сохранить изменения" }
  static get defaultInverse() { return "Закрыть" }
  constructor() { }

  ngOnInit() {
    if(! this.config) return;
    this.config.primaryTitle = this.config.primaryTitle ? this.config.primaryTitle : DialogButtonsComponent.defaultSave;
    this.config.inverseTitle = this.config.inverseTitle ? this.config.inverseTitle : DialogButtonsComponent.defaultInverse;
  }
}
