import { Component, ChangeDetectionStrategy, OnInit, Input } from "@angular/core";
import { InquiryInfo, SpecificityService, Specificity } from "../..";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Component({
  selector: 'app-preschool-inquiry-info-card',
  templateUrl: './preschool-inquiry-info-card.component.html',
  styleUrls: ['./preschool-inquiry-info-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreschoolInquiryInfoCardComponent implements OnInit {
  @Input() inquiryInfo: InquiryInfo;
  @Input() edit: () => void;

  constructor(private specificityService: SpecificityService) { }
  specificity: Observable<Specificity>
  ngOnInit() {
    this.specificity = this.specificityService.get(this.inquiryInfo.distributionParams.specificity).pipe(map(specificities => specificities[0]));
  }
}
