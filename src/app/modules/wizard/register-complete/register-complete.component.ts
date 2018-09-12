import { Component, OnInit } from '@angular/core';
import { StepBase } from '../shared/step-base';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-complete',
  templateUrl: './register-complete.component.html',
  styleUrls: ['./register-complete.component.css']
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

  constructor(private router: Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    let s = this;
  }

}
