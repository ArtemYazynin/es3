import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons } from '../../../shared';
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
  configs: ConfigsOfRoutingButtons;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.configs = new ConfigsOfRoutingButtons(ButtonsTitles.RegisterNew, ButtonsTitles.GoToInquiry,
      () => {
        this.router.navigate(["../../childrenStep"], { relativeTo: this.route });
      },
      () => {
        this.router.navigate(["inquiry", this.inquiryId]);
      }
    );
  }
}