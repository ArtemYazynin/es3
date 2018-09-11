import { Component, OnInit } from '@angular/core';
import { StepBase } from '../shared/step-base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-complete',
  templateUrl: './register-complete.component.html',
  styleUrls: ['./register-complete.component.css']
})
export class RegisterCompleteComponent implements OnInit, StepBase {
  inquiryId: string = this.route.snapshot.data.resolved.id;
  inquiryType: string = this.route.snapshot.data.resolved.inquiryType;
  isValid(): boolean { return; }
  goTo: {
    back: () => {

    };
    next: () => {

    };
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let s = this;
  }

}
