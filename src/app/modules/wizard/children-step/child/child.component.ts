import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Child, inquiryType } from '../../../../shared';
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

  personTypes = PersonType;
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
    const fullnameFormIsValid = this.editPersonComponent.fullnameComponent
      && this.editPersonComponent.fullnameComponent.fullnameForm
      && this.editPersonComponent.fullnameComponent.fullnameForm.valid;
    const identityCardFormIsValid = this.editPersonComponent.identityCardComponent
      && this.editPersonComponent.identityCardComponent.identityCardForm
      && this.editPersonComponent.identityCardComponent.identityCardForm.valid;
    return fullnameFormIsValid && identityCardFormIsValid && this.editPersonComponent.snilsComponent.isValid();
  }
}
