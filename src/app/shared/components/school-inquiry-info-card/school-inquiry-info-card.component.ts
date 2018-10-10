import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SchoolInquiryInfo } from '../../index';

@Component({
  selector: 'app-school-inquiry-info-card',
  templateUrl: './school-inquiry-info-card.component.html',
  styleUrls: ['./school-inquiry-info-card.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SchoolInquiryInfoCardComponent implements OnInit {
  @Input() schoolInquiryInfo: SchoolInquiryInfo;
  @Input() edit: () => void;

  templateContext: any;
  title = "Параметры заявления";

  constructor() { }

  ngOnInit() {
  }
}
