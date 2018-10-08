import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SchoolInquiryInfo } from '../../../../shared';

@Component({
  selector: 'app-preview-school-inquiry-info',
  templateUrl: './preview-school-inquiry-info.component.html',
  styleUrls: ['./preview-school-inquiry-info.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PreviewSchoolInquiryInfoComponent implements OnInit {
  @Input() schoolInquiryInfo: SchoolInquiryInfo;
  @Input() editHandler: () => void;

  templateContext: any;
  title = "Параметры заявления";

  constructor() { }

  ngOnInit() {
    let s = this;
  }
}
