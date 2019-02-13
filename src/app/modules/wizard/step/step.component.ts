import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }
}
