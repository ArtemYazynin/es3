import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InquiryInfo, SpecificityService, Specificity } from '../../../../shared';

@Component({
  selector: 'app-preschool-preview-inquiry-info',
  templateUrl: './preview-preschool-inquiry-info.component.html',
  styleUrls: ['./preview-preschool-inquiry-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewPreschoolInquiryInfoComponent implements OnInit {
  @Input() inquiryInfo: InquiryInfo;

  constructor(private specificityService: SpecificityService) { }
  specificity: Observable<Specificity>
  ngOnInit() {
    this.specificity = this.specificityService.get(this.inquiryInfo.distributionParams.specificity).pipe(map(specificities => specificities[0]));
  }
}
