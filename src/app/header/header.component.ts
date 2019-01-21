import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { InquiryTypeFriendlyNamePipe } from '../shared/inquiry-type.pipe';
import { inquiryType } from '../shared/models/inquiry-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  visible: boolean;
  inquiryFriendlyName: string;
  constructor(private router: Router, private cdr: ChangeDetectorRef, ) { }

  ngOnInit() {
    this.subscription = this.router.events
      .pipe(filter((event:NavigationEnd) => {
        const url = event.urlAfterRedirects ? event.urlAfterRedirects.trim(): undefined;
        return event instanceof NavigationEnd && !!url;
      }))
      .subscribe((event: NavigationEnd) => {
        let segments = event.urlAfterRedirects
          .split('/').filter(x => !!x)
          .map(x => x.trim());
        this.visible = segments.includes("wizard");

        const type = segments.find(x=> !!inquiryType[x]);
        if (type) {
          this.inquiryFriendlyName = new InquiryTypeFriendlyNamePipe().transform(type);
        }
        this.cdr.markForCheck();
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
