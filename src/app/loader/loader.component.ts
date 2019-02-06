import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  private subscription: Subscription;
  show = false;
  constructor(private loaderService: LoaderService, private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        // setTimeout(() => {
        //   this.cdr.detectChanges();
        // });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
