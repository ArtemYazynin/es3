import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { SERVER_URL } from '../../../app.module';
import { InquiryInfo } from '../../../shared';
import { InquiryModule } from '../inquiry.module';
import { PreschoolInquiryInfoDialogComponent } from './preschool-inquiry-info-dialog.component';


describe('PreschoolInquiryInfoDialogComponent', () => {
  let component: PreschoolInquiryInfoDialogComponent;
  let fixture: ComponentFixture<PreschoolInquiryInfoDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  const defaultMatDialogData = { $inquiryInfo: new BehaviorSubject<InquiryInfo>(new InquiryInfo(undefined, undefined, undefined)) };

  let prepare = (matDialogData: { $inquiryInfo: BehaviorSubject<InquiryInfo> }) => {
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

    fixture = TestBed.createComponent(PreschoolInquiryInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    prepare(defaultMatDialogData);
    expect(component).toBeTruthy();
  });
});
