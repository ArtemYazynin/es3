import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-snils',
  templateUrl: './snils.component.html',
  styleUrls: ['./snils.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnilsComponent implements OnInit {
  snilsMask = [/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, " ", /\d/, /\d/];
  pattern = "^\\d{3}-\\d{3}-\\d{3}\\s\\d{2}$";
  snils: any = "";
  constructor() { }

  ngOnInit() {
  }

}
