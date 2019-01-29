import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { esConstant, SERVER_URL } from '../../../app.module';
import { Inquiry } from '../../../shared';
import { DialogButtonsComponent } from '../dialog-buttons/dialog-buttons.component';
import { InquiryModule } from '../inquiry.module';
import { EditFileAttachmentsDialogComponent } from './edit-file-attachments-dialog.component';

fdescribe('EditFileAttachmentsDialogComponent', () => {
  let component: EditFileAttachmentsDialogComponent;
  let fixture: ComponentFixture<EditFileAttachmentsDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  let mockInquiry = new Inquiry();
  mockInquiry.files = [];
  const defaultMatDialogData = { $inquiry: new BehaviorSubject<Inquiry>(mockInquiry) };

  let prepare = (matDialogData: { $inquiry: BehaviorSubject<Inquiry> }) => {
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
    fixture = TestBed.createComponent(EditFileAttachmentsDialogComponent);
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
});
