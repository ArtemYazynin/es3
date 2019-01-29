import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { esConstant, SERVER_URL } from '../../../app.module';
import { FamilyInfo, Petition } from '../../../shared';
import { DialogButtonsComponent } from '../dialog-buttons/dialog-buttons.component';
import { InquiryModule } from '../inquiry.module';
import { EditPetitionDialogComponent } from './edit-petition-dialog.component';


describe('EditPetitionDialogComponent', () => {
  let component: EditPetitionDialogComponent;
  let fixture: ComponentFixture<EditPetitionDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  const defaultMatDialogData = {
    $petition: new BehaviorSubject<Petition>(
      new Petition("e4b16a48-4b0d-4b63-9e55-024107cfdbe3", new Date(), "e4b16a48-4b0d-4b63-9e55-024107cfdbe3",
        new FamilyInfo("e4b16a48-4b0d-4b63-9e55-024107cfdbe3", "Особое семейное положение"), "rikikrisa"))
  };

  let prepare = (matDialogData: { $petition: BehaviorSubject<Petition> }) => {
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
    fixture = TestBed.createComponent(EditPetitionDialogComponent);
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

  it('component.editPetitionComponent.petition. Should have model', () => {
    prepare(defaultMatDialogData);
    expect(component.editPetitionComponent.petition).toEqual(defaultMatDialogData.$petition.getValue());
  });

  it("config.inverseAction. Should call close dialog", () => {
    prepare(defaultMatDialogData);
    component.config.inverseAction();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it("config.primaryAction. Should call: close dialog, next with default parameter.", () => {
    prepare(defaultMatDialogData);
    spyOn(component.data.$petition, "next");
    spyOn(component.editPetitionComponent, "getResult").and.callThrough();
    component.config.primaryAction();

    expect(component.editPetitionComponent.getResult).toHaveBeenCalled();
    expect(component.data.$petition.next).toHaveBeenCalledWith(defaultMatDialogData.$petition.getValue());
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
