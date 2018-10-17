import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ContactInfo } from '../../../modules/wizard/shared';

@Component({
  selector: 'app-contact-info-card',
  templateUrl: './contact-info-card.component.html',
  styleUrls: ['./contact-info-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoCardComponent implements OnInit {
  @Input() edit: () => void;
  @Input() contactInfo: ContactInfo;

  constructor() { }

  ngOnInit() {
  }

}
