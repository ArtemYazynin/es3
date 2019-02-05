import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { LoaderService, LoaderState } from '../../index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  show = false;
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
