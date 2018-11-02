import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Child, inquiryType, Entity } from '../../../../shared';
import { PersonType } from '../../../../shared/person-type.enum';
import { EditPersonComponent } from '../../../inquiry/shared/components/edit-person/edit-person.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit, AfterViewInit {
  counter: number = 0;
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;

  constructor() { }
  inquiryTypes = inquiryType;
  personTypes = PersonType;
  id: string = Math.random().toString(36).substring(2);
  inquiryType: string;
  show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  disabledChild: any;
  child: Child;
  disabilityTypes: Array<Entity<string>> = [
    new Entity<string>("", "Нет"),
    new Entity<string>("0", "Ребенок-инвалид"),
    new Entity<string>("1", "1 группа"),
    new Entity<string>("2", "2 группа"),
    new Entity<string>("3", "3 группа"),
  ];

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    if (this.child) {
      this.disabledChild = this.child.disabledChild;
    } else {
      if (this.inquiryType == inquiryType.preschool) {
        this.disabledChild = false;
      } else {
        this.disabledChild = "";
      }
    }
  }

  isValid = (): boolean => {
    const hasComponent = !!this.editPersonComponent;
    const fullnameFormIsValid = hasComponent && this.editPersonComponent.fullnameComponent
      && this.editPersonComponent.fullnameComponent.fullnameForm
      && this.editPersonComponent.fullnameComponent.fullnameForm.valid;
    const identityCardFormIsValid = hasComponent && this.editPersonComponent.identityCardComponent
      && this.editPersonComponent.identityCardComponent.identityCardForm
      && this.editPersonComponent.identityCardComponent.identityCardForm.valid;

    const snilsIsValid = hasComponent && this.editPersonComponent.snilsComponent.isValid()
    return fullnameFormIsValid && identityCardFormIsValid && snilsIsValid;
  }
}
