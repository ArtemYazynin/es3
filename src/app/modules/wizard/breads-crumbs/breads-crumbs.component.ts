import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BreadsCrumbsService } from '../../../shared/breads-crumbs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-breads-crumbs',
  templateUrl: './breads-crumbs.component.html',
  styleUrls: ['./breads-crumbs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadsCrumbsComponent implements OnInit {

  constructor(private breadsCrumbsService: BreadsCrumbsService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let s = 22;
    });
  }

}
