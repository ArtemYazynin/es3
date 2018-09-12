import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snils',
  templateUrl: './snils.component.html',
  styleUrls: ['./snils.component.css']
})
export class SnilsComponent implements OnInit {
  snilsMask = [/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, " ", /\d/, /\d/];
  pattern = "^\\d{3}-\\d{3}-\\d{3}\\s\\d{2}$";
  snils: any = "";
  constructor() { }

  ngOnInit() {
  }

}
