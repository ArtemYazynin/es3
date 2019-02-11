import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../shared/loader.service';
import { LoaderState } from '../shared/models/loader-state';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  //changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit, OnDestroy {
  @Input() diameter?:number;
  private subscription: Subscription;
  show = false;
  constructor(private loaderService: LoaderService, private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.diameter = this.diameter || 100;
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
