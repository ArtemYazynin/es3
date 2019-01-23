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

  let mockParent = new Parent("q", "w", "e", "123", false, undefined, undefined, 1);
  mockParent.relationType = new RelationType("26B732C2-580D-4FCC-8034-A88F01009735", "Отец", false);

  const defaultMatDialogData = { $owner: new BehaviorSubject<Parent>(mockParent) };

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
    expect(component.config).toBeTruthy();
    expect(component.config.primaryTitle).toEqual(DialogButtonsComponent.defaultSave);
    expect(component.config.inverseTitle).toEqual(DialogButtonsComponent.defaultInverse);
  });

  it('relationTypeComponent.owner. Should have owner', () => {
    prepare(defaultMatDialogData);
    expect(component.relationTypeComponent.owner).toEqual(defaultMatDialogData.$owner.getValue());
  });

  it("config.inverseAction. Should call close dialog", () => {
    prepare(defaultMatDialogData);
    component.config.inverseAction();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it("config.primaryAction. Should call: close dialog, next with default parameter.", () => {
    prepare(defaultMatDialogData);
    spyOn(component.data.$owner, "next");
    component.config.primaryAction();

    expect(component.data.$owner.next).toHaveBeenCalledWith(defaultMatDialogData.$owner.getValue());
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});