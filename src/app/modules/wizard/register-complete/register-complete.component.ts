import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InquiryService } from '../../../shared';
import { StepBase } from '../shared/models/step-base';

@Component({
  selector: 'app-register-complete',
  templateUrl: './register-complete.component.html',
  styleUrls: ['./register-complete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterCompleteComponent implements OnInit, StepBase {
  inquiryId: string = this.route.snapshot.data.resolved.inquiryId;
  inquiryType: string = this.route.snapshot.data.resolved.inquiryType;
  isValid(): boolean { return; }
  goTo = {
    back: () => {
      this.router.navigate(["inquiry", this.inquiryId]);
    },
    next: () => {
      this.router.navigate(["../../childrenStep"], { relativeTo: this.route });
    }
  };

  constructor(private router: Router, private route: ActivatedRoute, private inquiryService: InquiryService) {

  }

  ngOnInit() {
  }
}
