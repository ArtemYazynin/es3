import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from '../../../shared/loader.service';
import { Router, NavigationEnd } from '@angular/router';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // this.loaderService.hide();
    // this.cdr.markForCheck();
  }
}
