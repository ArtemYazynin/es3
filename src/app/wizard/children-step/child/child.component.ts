import { Component, OnInit, ViewChild } from '@angular/core';
import { FullNameComponent } from '../../../person/full-name/full-name.component';
import { GenderComponent } from '../../../person/gender/gender.component';
import { IdentityCardComponent } from '../../../person/identity-card/identity-card.component';
import { SnilsComponent } from '../../../person/snils/snils.component';
import { IdentityCardType } from '../../../shared';
import { inquiryType } from "../../../shared/inquiry-type";

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent;
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChild(GenderComponent) genderComponent: GenderComponent;

  constructor() { }


  groupOfIdentityCardTypeId: Array<number> = [
    IdentityCardType["Паспорт РФ"],
    IdentityCardType["Свидетельство о рождении РФ"],
    IdentityCardType["Свидетельство о рождении, выданное уполномоченным органом иностранного государства"],
    IdentityCardType["Иностранный паспорт"]
  ];
  id: string = Math.random().toString(36).substring(2);
  inquiryType: string;
  show: boolean = false;
  disabledChild: any;

  ngOnInit() {
    if (!!this.disabledChild) return;
    if (this.inquiryType == inquiryType.preschool) {
      this.disabledChild = false;
    } else {
      this.disabledChild = "";
    }
  }
}
