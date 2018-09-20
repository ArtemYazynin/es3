import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderComponent implements OnInit {

  constructor() { }

  @Input() gender: number;


  ngOnInit() {
    this.gender = this.gender || 1;
  }

}
