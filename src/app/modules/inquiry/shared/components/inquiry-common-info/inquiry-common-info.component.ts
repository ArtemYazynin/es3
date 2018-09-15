import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Inquiry } from '../../../../../shared';

@Component({
  selector: 'app-inquiry-common-info',
  templateUrl: './inquiry-common-info.component.html',
  styleUrls: ['./inquiry-common-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquiryCommonInfoComponent implements OnInit {
  @Input() inquiry:Inquiry;

  constructor() { }

  ngOnInit() {
  }

}
