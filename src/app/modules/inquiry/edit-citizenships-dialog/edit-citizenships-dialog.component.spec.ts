import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { esConstant, SERVER_URL } from '../../../app.module';
import { Applicant, ApplicantType, Child, Parent } from '../../../shared';
import { PersonType } from '../../../shared/person-type.enum';
import { DialogButtonsComponent } from '../dialog-buttons/dialog-buttons.component';
import { InquiryModule } from '../inquiry.module';
import { EditCitizenshipsDialogComponent } from './edit-citizenships-dialog.component';

describe('EditCitizenshipsDialogComponent', () => {
  let component: EditCitizenshipsDialogComponent;
  let fixture: ComponentFixture<EditCitizenshipsDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  let mockParent = new Parent("q", "w", "e", "123", false, undefined, undefined, 1);
  mockParent.citizenships = new Array<number>();
  mockParent.citizenships.push(643);

  const defaultMatDialogData = { $person: new BehaviorSubject<Parent>(mockParent), personType: PersonType.Parent, applicantType: ApplicantType.Parent };

  let prepare = (matDialogData: { $person: BehaviorSubject<Parent | Applicant | Child>, personType: PersonType, applicantType: ApplicantType }) => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDialogModule, InquiryModule, HttpClientTestingModule],
      declarations: [],
      providers: [
        MatDialog,
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: matDialogData
        },
        { provide: SERVER_URL, useValue: "http://localhost:3500" },
        { provide: esConstant, useValue: {} }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EditCitizenshipsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
  it('should create', () => {
    prepare(defaultMatDialogData);
    expect(component).toBeTruthy();
    expect(component.config).toBeTruthy();
    expect(component.config.primaryTitle).toEqual(DialogButtonsComponent.defaultSave);
    expect(component.config.inverseTitle).toEqual(DialogButtonsComponent.defaultInverse);
  });

  it('editCitizenshipsComponent.model. Should have model', () => {
    prepare(defaultMatDialogData);
    expect(component.editCitizenshipsComponent.model).toEqual(defaultMatDialogData.$person.getValue());
    expect(component.editCitizenshipsComponent.personType).toEqual(defaultMatDialogData.personType);
    expect(component.editCitizenshipsComponent.applicantType).toEqual(defaultMatDialogData.applicantType);
  });

  it("config.inverseAction. Should call close dialog", () => {
    prepare(defaultMatDialogData);
    component.config.inverseAction();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it("config.primaryAction. Should call: close dialog, next with default parameter.", () => {
    prepare(defaultMatDialogData);
    spyOn(component.data.$person, "next");
    component.config.primaryAction();

    if (component.data.personType == PersonType.Applicant)
      expect(component.data.$person.value["countryStateApplicantDocument"]).toBeUndefined();
    if (component.data.personType == PersonType.Parent)
      expect(component.data.$person.value["countryStateDocument"]).toBeUndefined();

    expect(component.data.$person.next).toHaveBeenCalledWith(defaultMatDialogData.$person.getValue());
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
