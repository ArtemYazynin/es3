import { Component, OnInit, ViewChild } from '@angular/core';
import { IdentityCardType } from '../../../shared/index';
import { FullNameComponent } from '../../../person/full-name/full-name.component';
import { IdentityCardComponent } from '../../../person/identity-card/identity-card.component';
import { SnilsComponent } from '../../../person/snils/snils.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent;
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;

  constructor() { }

  groupOfIdentityCardTypeId: Array<number> = [
    IdentityCardType["Паспорт РФ"],
    IdentityCardType["Свидетельство о рождении РФ"],
    IdentityCardType["Свидетельство о рождении, выданное уполномоченным органом иностранного государства"],
    IdentityCardType["Иностранный паспорт"]
  ];
  id: string = Math.random().toString(36).substring(2);
  show: boolean = false;

  ngOnInit() {
  }
}
