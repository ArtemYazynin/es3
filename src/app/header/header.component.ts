import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { InquiryTypeFriendlyNamePipe } from '../shared/inquiry-type.pipe';

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
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        let segments = event.urlAfterRedirects
          .split('/').filter(x => !!x)
          .map(x => x.trim());
        this.visible = segments.includes("wizard");
        if (segments.length == 3) {
          this.inquiryFriendlyName = new InquiryTypeFriendlyNamePipe().transform(segments[1]);
        }
        this.cdr.markForCheck();
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
