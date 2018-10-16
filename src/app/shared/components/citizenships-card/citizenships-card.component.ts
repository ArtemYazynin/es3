import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Child } from '../../models/child.model';
import { Parent, Applicant } from '../../index';
import { DrawService } from '../../draw.service';

@Component({
  selector: 'app-citizenships-card',
  templateUrl: './citizenships-card.component.html',
  styleUrls: ['./citizenships-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitizenshipsCardComponent implements OnInit {
  @Input() model: Parent | Applicant | Child;

  constructor(public drawService: DrawService) { }

  ngOnInit() {
  }

  edit(){
    
  }
}
