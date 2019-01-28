import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { esConstant, SERVER_URL } from '../../../app.module';
import { inquiryType, Institution, SchoolClass } from '../../../shared';
import { DialogButtonsComponent } from '../dialog-buttons/dialog-buttons.component';
import { InquiryModule } from '../inquiry.module';
import { EditInstitutionDialogComponent } from './edit-preschool-institution-dialog.component';

describe('PrivilegeDialogComponent', () => {
  let component: EditInstitutionDialogComponent;
  let fixture: ComponentFixture<EditInstitutionDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  let mockInstitutions = {
    institutions: [
      new Institution("5258E28E-64F1-4F1F-810F-A548002D9A3A", "Д/с 027 Лесовичок (Ц., ул Чапаева, 35А)", 1),
      new Institution("FC4DBC65-4B5A-4D87-91EA-A548002D9A65", "Д/с 028 Ромашка (Ц., ул.Ушакова, 37)", 1)
    ],
    IsLearnEducCenter: undefined
  };

  const defaultMatDialogData = { $configSubject: new BehaviorSubject<{ institutions: Array<Institution> | Array<SchoolClass>, IsLearnEducCenter: boolean }>(mockInstitutions), inquiryType: inquiryType.preschool };

  let prepare = (matDialogData: { $configSubject: BehaviorSubject<{ institutions: Array<Institution> | Array<SchoolClass>, IsLearnEducCenter: boolean }>, inquiryType: string }) => {
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
    fixture = TestBed.createComponent(EditInstitutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.editInstitutionsComponent.selectedInstitutions = [
      new Institution("5258E28E-64F1-4F1F-810F-A548002D9A3A", "Д/с 027 Лесовичок (Ц., ул Чапаева, 35А)", 1),
      new Institution("FC4DBC65-4B5A-4D87-91EA-A548002D9A65", "Д/с 028 Ромашка (Ц., ул.Ушакова, 37)", 1)
    ];
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
    expect(component.editInstitutionsComponent.institutions).toEqual(defaultMatDialogData.$configSubject.getValue().institutions as Array<Institution>);
    expect(component.editInstitutionsComponent.IsLearnEducCenter).toBeUndefined();
    expect(component.editInstitutionsComponent.inquiryType).toEqual(defaultMatDialogData.inquiryType);
  });

  it("config.inverseAction. Should call close dialog", () => {
    prepare(defaultMatDialogData);
    component.config.inverseAction();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it("config.primaryAction. Should call: close dialog, next with default parameter.", () => {
    prepare(defaultMatDialogData);
    spyOn(component.data.$configSubject, "next");

    component.config.primaryAction();

    expect(component.data.$configSubject.next).toHaveBeenCalledWith(defaultMatDialogData.$configSubject.getValue());
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
