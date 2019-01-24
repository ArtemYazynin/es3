import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { SERVER_URL } from '../../../app.module';
import { Parent, RelationType } from '../../../shared';
import { DialogButtonsComponent } from '../dialog-buttons/dialog-buttons.component';
import { InquiryModule } from '../inquiry.module';
import { RelationTypeDialogComponent } from './relation-type-dialog.component';

describe('RelationTypeDialogComponent', () => {
  let component: RelationTypeDialogComponent;
  let fixture: ComponentFixture<RelationTypeDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };
  const defaultMatDialogData = { $owner: new BehaviorSubject<Parent>(new Parent("q", "w", "e", "123", false, new Date(), "г. Самара", 1)) };
  const defaultDocument = {
    name: "testName",
    series: "testSeries",
    number: "testNumber",
    dateIssue: "11.06.1990",
    dateExpired: "23.01.2020"
  }

  let prepare = (matDialogData: { $owner: BehaviorSubject<Parent> }) => {
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
        { provide: SERVER_URL, useValue: "http://localhost:3500" }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RelationTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    prepare(defaultMatDialogData);
    expect(component).toBeTruthy();
  });

  it("component props should initizalized", () => {
    prepare(defaultMatDialogData);
    expect(component.config).toBeTruthy();
    expect(component.config.primaryTitle).toEqual(DialogButtonsComponent.defaultSave);
    expect(component.config.inverseTitle).toEqual(DialogButtonsComponent.defaultInverse);
    expect(component.config.inverseAction).toBeDefined();
    expect(component.config.primaryAction).toBeDefined();

    expect(component.parent).toBeDefined();
    expect(component.relationTypeComponent.owner).toEqual(defaultMatDialogData.$owner.getValue());
  });

  it('component.config.inverseAction should call close', () => {
    prepare(defaultMatDialogData);
    component.config.inverseAction();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('component.config.primaryAction should call next & close', () => {
    prepare(defaultMatDialogData);
    spyOn(defaultMatDialogData.$owner, "next");

    component.config.primaryAction();

    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(defaultMatDialogData.$owner.next).toHaveBeenCalledWith(defaultMatDialogData.$owner.getValue());
  });

  it("config.primaryAction, relationTypeComponent.owner receive relationType. Should parent.relationType equals relationTypeComponent.owner.relationType", () => {
    const newId = "26";
    const newName = "newName";
    let parent = defaultMatDialogData.$owner.getValue();
    parent.relationType = new RelationType("25", "Мать", false);
    defaultMatDialogData.$owner.next(parent);
    prepare(defaultMatDialogData);
    component.relationTypeComponent.owner = new Parent("1", "2", "3", "", false, undefined, "", 1);
    component.relationTypeComponent.owner.relationType = new RelationType(newId, newName, false);

    component.config.primaryAction();

    expect(component.parent.relationType.id).toEqual(newId);
    expect(component.parent.relationType.name).toEqual(newName);
  });

  it("config.primaryAction, owner has relationType.confirmationDocument. Should initialized parent.parentRepresentChildrenDocument.", () => {
    let parent = defaultMatDialogData.$owner.getValue();
    parent.relationType = new RelationType("25", "Мать", true);
    defaultMatDialogData.$owner.next(parent);
    prepare(defaultMatDialogData);

    component.relationTypeComponent.editConfirmationDocumentComponent.confirmationDocumentForm.controls.series.setValue(defaultDocument.series);
    component.relationTypeComponent.editConfirmationDocumentComponent.confirmationDocumentForm.controls.number.setValue(defaultDocument.number);
    component.relationTypeComponent.editConfirmationDocumentComponent.confirmationDocumentForm.controls.dateIssue.setValue(defaultDocument.dateIssue);
    component.relationTypeComponent.editConfirmationDocumentComponent.confirmationDocumentForm.controls.dateExpired.setValue(defaultDocument.dateExpired);

    component.config.primaryAction();
    expect(component.parent.parentRepresentChildrenDocument).toBeDefined();
    expect(component.parent.parentRepresentChildrenDocument.series).toEqual(defaultDocument.series);
    expect(component.parent.parentRepresentChildrenDocument.number).toEqual(defaultDocument.number);
    expect(component.parent.parentRepresentChildrenDocument.dateIssue.toString()).toEqual(defaultDocument.dateIssue);
    expect(component.parent.parentRepresentChildrenDocument.dateExpired.toString()).toEqual(defaultDocument.dateExpired);
  });

  it("isValid. isDirtyRelType=false,isDirtyConfDoc=false,isValidRelType=false. Should invalid ", () => {
    prepare(defaultMatDialogData);
    spyOn(component.relationTypeComponent, "isValid").and.callThrough();
    const isValid = component.isValid();
    expect(isValid).toBe(false);
    expect(component.relationTypeComponent.isValid).toHaveBeenCalled();
  });
  it("isValid. isDirtyRelType=true, isValidRelType=true. Should valid ", () => {
    let parent = defaultMatDialogData.$owner.getValue();
    parent.relationType = new RelationType("25", "Мать", true);
    defaultMatDialogData.$owner.next(parent);
    prepare(defaultMatDialogData);
    spyOn(component.relationTypeComponent, "isValid").and.callThrough();

    component.relationTypeComponent.editConfirmationDocumentComponent.confirmationDocumentForm.controls.name.setValue(defaultDocument.name);
    component.relationTypeComponent.editConfirmationDocumentComponent.confirmationDocumentForm.controls.series.setValue(defaultDocument.series);
    component.relationTypeComponent.editConfirmationDocumentComponent.confirmationDocumentForm.controls.number.setValue(defaultDocument.number);
    component.relationTypeComponent.editConfirmationDocumentComponent.confirmationDocumentForm.controls.dateIssue.setValue(new Date(1990, 5, 11));
    component.relationTypeComponent.editConfirmationDocumentComponent.confirmationDocumentForm.controls.dateExpired.setValue(new Date(2020, 0, 23));

    component.relationTypeComponent.relationForm.markAsDirty();
    component.relationTypeComponent.editConfirmationDocumentComponent.confirmationDocumentForm.markAsDirty();

    const isValid = component.isValid();
    expect(isValid).toBe(true);
    expect(component.relationTypeComponent.isValid).toHaveBeenCalled();
  });
});