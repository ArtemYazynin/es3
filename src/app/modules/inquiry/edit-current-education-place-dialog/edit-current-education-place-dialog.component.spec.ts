import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { esConstant, SERVER_URL } from '../../../app.module';
import { CurrentEducationPlace, Group, Institution } from '../../../shared';
import { DialogButtonsComponent } from '../dialog-buttons/dialog-buttons.component';
import { InquiryModule } from '../inquiry.module';
import { EditCurrentEducationPlaceDialogComponent } from './edit-current-education-place-dialog.component';

describe('EditCurrentEducationPlaceDialogComponent', () => {
  let component: EditCurrentEducationPlaceDialogComponent;
  let fixture: ComponentFixture<EditCurrentEducationPlaceDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  let mockCurrentPlace = new CurrentEducationPlace(
    "7a3dffaf-7bb1-488b-8dc1-a61a00fc60dc", 1, "5258E28E-64F1-4F1F-810F-A548002D9A3A", false, undefined,
    new Group("5258E28E-64F1-4F1F-810F-A548002D9A3A", "4Б ясельная", 11, 12, 2018,
      new Institution("5258E28E-64F1-4F1F-810F-A548002D9A3A", "Д/с 027 Лесовичок (Ц., ул Чапаева, 35А)", 1)));

  const defaultMatDialogData = { $currentEducationPlace: new BehaviorSubject<CurrentEducationPlace>(mockCurrentPlace), inquiryType: "preschool" };

  let prepare = (matDialogData: { $currentEducationPlace: BehaviorSubject<CurrentEducationPlace>, inquiryType: string }) => {
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
    fixture = TestBed.createComponent(EditCurrentEducationPlaceDialogComponent);
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

  it('currentEducationPlaceEditComponent.currentEducationPlace. Should have model', () => {
    prepare(defaultMatDialogData);
    expect(component.currentEducationPlaceEditComponent.currentEducationPlace).toEqual(defaultMatDialogData.$currentEducationPlace.getValue());
    expect(component.currentEducationPlaceEditComponent.inquiryType).toEqual(defaultMatDialogData.inquiryType);
  });

  it("config.inverseAction. Should call close dialog", () => {
    prepare(defaultMatDialogData);
    component.config.inverseAction();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it("config.primaryAction. Should call: close dialog, next with default parameter.", () => {
    prepare(defaultMatDialogData);
    spyOn(component.data.$currentEducationPlace, "next");
    spyOn(component.currentEducationPlaceEditComponent, "getResult").and.callThrough();
    component.config.primaryAction();

    expect(component.currentEducationPlaceEditComponent.getResult).toHaveBeenCalled();
    expect(component.data.$currentEducationPlace.next).toHaveBeenCalledWith(defaultMatDialogData.$currentEducationPlace.getValue());
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
