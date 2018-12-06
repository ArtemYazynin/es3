import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-snils',
  templateUrl: './snils.component.html',
  styleUrls: ['./snils.component.css'],
  host:{ 'class': 'host'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnilsComponent implements OnInit {
  snilsMask = [/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, " ", /\d/, /\d/];
  pattern = "^\\d{3}-\\d{3}-\\d{3}\\s\\d{2}$";
  expr = "\\d"
  @Input() snils: string = "";
  constructor() { }

  ngOnInit() {
  }
  isValid() {
    return !this.snils || !this.snils.match("_");
  }
}
