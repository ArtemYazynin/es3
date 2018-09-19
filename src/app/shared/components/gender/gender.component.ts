import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderComponent implements OnInit {

  constructor() { }

  gender: number = 1;
  
  ngOnInit() {
  }

}
