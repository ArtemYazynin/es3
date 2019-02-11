import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Child, DisabilityService, DisabilityType, inquiryType } from '../../index';

@Component({
  selector: 'app-disability',
  templateUrl: './disability.component.html',
  styleUrls: ['./disability.component.css'],
  host:{ 'class': 'host'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisabilityComponent implements OnInit, OnDestroy {
  @Input() inquiryType: string;
  @Input() model: Child;

  inquiryTypes = inquiryType;
  private subscription: Subscription;
  disabledChild: boolean = false;
  disabilityType: DisabilityType;
  disabilities: Array<DisabilityType>;
  constructor(private disabilityService: DisabilityService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.disabilityService.gets().subscribe(data => {
      this.disabilities = data;
      if (this.model) {
        this.disabledChild = this.model.disabledChild;
        if (this.model.disabilityType) this.disabilityType = this.disabilities.find(x => x.id == this.model.disabilityType.id);
        this.cdr.markForCheck()
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
