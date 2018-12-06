import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Child, inquiryType } from '../../../../shared';
import { DisabilityComponent } from '../../../../shared/components/disability/disability.component';
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
  @ViewChild(DisabilityComponent) disabilityComponent: DisabilityComponent;

  constructor() { }

  inquiryTypes = inquiryType;
  personTypes = PersonType;
  id: string = Math.random().toString(36).substring(2);
  inquiryType: string;
  show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  child: Child;

  ngOnInit() {
  }

  ngAfterViewInit(): void { }

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
