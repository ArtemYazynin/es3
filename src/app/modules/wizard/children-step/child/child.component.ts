import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Child, inquiryType, Entity, DisabilityType, DisabilityService } from '../../../../shared';
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

  constructor(private disabilityService: DisabilityService, private cdr: ChangeDetectorRef) { }

  inquiryTypes = inquiryType;
  personTypes = PersonType;
  id: string = Math.random().toString(36).substring(2);
  inquiryType: string;
  show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  disabledChild: boolean = false;;
  disabilityType: DisabilityType;
  child: Child;
  // disabilityTypes: Array<DisabilityType> = [
  //   new DisabilityType("", "Нет"),
  // ];
  disabilities: Array<DisabilityType>;

  ngOnInit() {
    this.disabilityService.get().subscribe(x => {
      this.disabilities = x;
      if (this.child) {
        this.disabledChild = this.child.disabledChild;
        this.disabilityType = this.disabilities.find(x => x.id == this.child.disabilityType.id);
        this.cdr.markForCheck() 
      }
    });
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
