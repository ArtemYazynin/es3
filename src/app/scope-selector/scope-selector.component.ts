import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-scope-selector',
  templateUrl: './scope-selector.component.html',
  styleUrls: ['./scope-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScopeSelectorComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  private toggleNumber: any;
  private toggleContainer: any;
  private regionList: any;
  constructor() { }

  ngOnInit() {
    this.toggleContainer = document.getElementById('toggle-container');
    this.regionList = document.getElementById("region-list");

    fromEvent(document.getElementById("container"), "click")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.toggleNumber = !this.toggleNumber;
        if (this.toggleNumber) {
          this.toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
        } else {
          this.toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
        }
        console.log(this.toggleNumber)
      });

    fromEvent(document.getElementsByClassName("region-list")[0], "click")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.regionList.classList.toggle("on");
      });
    const textWhiteCollection = document.getElementsByClassName("text-white");
    for (let index = 0; index < textWhiteCollection.length; index++) {
      fromEvent(textWhiteCollection[index], "click")
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(x => {
          this.regionList.classList.toggle("on");
        });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
