import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BreadsCrumbsService } from '../../../shared/breads-crumbs.service';
import { ActivatedRoute, Router, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IBreadcrumb } from '../../../shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breads-crumbs',
  templateUrl: './breads-crumbs.component.html',
  styleUrls: ['./breads-crumbs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadsCrumbsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public $breadcrumbs: BehaviorSubject<Array<IBreadcrumb>>;
  constructor(private router: Router,
    private cdr: ChangeDetectorRef,
    private breadsCrumbsService: BreadsCrumbsService
  ) {
    this.$breadcrumbs = breadsCrumbsService.breadsCrumbs;
  }

  ngOnInit() {
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.breadsCrumbsService.clear();
        let segments = event.urlAfterRedirects
          .split('/').filter(x => !!x)
          .map(x => x.trim());
        this.setMainPage(segments);
        this.breadsCrumbsService.initWizardBreadsCrumbs(segments);
        this.breadsCrumbsService.initInquiryBreadsCrumbs(segments);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setMainPage(segments: string[]) {
    if (!segments) return;
    const mainPage = segments.length == 0;
    if (mainPage) return;
    this.breadsCrumbsService.set({ label: "Главная", url: "" });
  }
}