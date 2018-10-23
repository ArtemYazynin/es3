import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConfigsOfRoutingButtons } from '../../configs-of-routing-buttons';

@Component({
    selector: 'app-routing-buttons',
    templateUrl: './routing-buttons.component.html',
    styleUrls: ['./routing-buttons.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutingButtonsComponent {
    @Input() config: ConfigsOfRoutingButtons;
    @Input() isValid: boolean;

    constructor() { }
}