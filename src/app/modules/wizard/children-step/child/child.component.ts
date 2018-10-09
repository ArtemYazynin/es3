import { Component, OnInit, ViewChild, ChangeDetectionStrategy, AfterViewInit, DoCheck } from '@angular/core';
import { IdentityCardComponent } from '../../../../shared/components/identity-card/identity-card.component';
import { FullNameComponent } from '../../../../shared/components/full-name/full-name.component';
import { SnilsComponent } from '../../../../shared/components/snils/snils.component';
import { GenderComponent } from '../../../../shared/components/gender/gender.component';
import { IdentityCardType, inquiryType, Child, FormService } from '../../../../shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit, AfterViewInit {
  counter:number = 0;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent;
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChild(GenderComponent) genderComponent: GenderComponent;

  constructor(private formService: FormService) { }


  groupOfIdentityCardTypeId: Array<number> = [
    IdentityCardType["Паспорт РФ"],
    IdentityCardType["Свидетельство о рождении РФ"],
    IdentityCardType["Свидетельство о рождении, выданное уполномоченным органом иностранного государства"],
    IdentityCardType["Иностранный паспорт"]
  ];
  id: string = Math.random().toString(36).substring(2);
  inquiryType: string;
  show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  disabledChild: any;
  child: Child;

  ngOnInit() {
    if (!!this.disabledChild) return;
    if (this.inquiryType == inquiryType.preschool) {
      this.disabledChild = false;
    } else {
      this.disabledChild = "";
    }
  }

  ngAfterViewInit(): void {
    if (this.child) {
      this.disabledChild = this.child.disabledChild;
    }
  }

  isValid = (): boolean => {
    const fullnameFormIsValid = this.fullnameComponent && this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid;
    const identityCardFormIsValid = this.identityCardComponent && this.identityCardComponent.identityCardForm && this.identityCardComponent.identityCardForm.valid;
    return fullnameFormIsValid && identityCardFormIsValid && this.snilsComponent.isValid();
  }
}
