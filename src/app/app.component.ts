import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from './shared/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  ngx-loading * {border-radius: 10px; text-align: center} `]
})
export class AppComponent {
  isSpinnerVisibile$: Observable<boolean> = this.layoutService.isNavigationPending$;

  constructor(private layoutService: LayoutService) { }
}
