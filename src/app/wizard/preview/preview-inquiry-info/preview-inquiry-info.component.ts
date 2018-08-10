import { Component, OnInit, Input } from '@angular/core';
import { InquiryInfo, SpecificityService, Specificity } from '../../../shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-preview-inquiry-info',
  templateUrl: './preview-inquiry-info.component.html',
  styleUrls: ['./preview-inquiry-info.component.css']
})
export class PreviewInquiryInfoComponent implements OnInit {
  @Input() inquiryInfo:InquiryInfo;

  constructor(private specificityService:SpecificityService) { }
  specificity:Observable<Specificity>
  ngOnInit() {
    this.specificity = this.specificityService.get(this.inquiryInfo.distributionParams.specificity).pipe(map(specificities=>specificities[0]));
  }
}
