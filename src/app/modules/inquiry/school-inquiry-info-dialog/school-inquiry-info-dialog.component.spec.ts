import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { esConstant, SERVER_URL } from '../../../app.module';
import { SchoolInquiryInfo } from '../../../shared';
import { InquiryModule } from '../inquiry.module';
import { SchoolInquiryInfoDialogComponent } from './school-inquiry-info-dialog.component';

fdescribe('SchoolInquiryInfoDialogComponent', () => {
  let component: SchoolInquiryInfoDialogComponent;
  let fixture: ComponentFixture<SchoolInquiryInfoDialogComponent>;

  const mockDialogRef = { close: jasmine.createSpy('close') };

  const defaultMatDialogData = {
    $schoolInquiryInfo: new BehaviorSubject<SchoolInquiryInfo>(undefined)
  };
  let prepare = (matDialogData: { $schoolInquiryInfo: BehaviorSubject<SchoolInquiryInfo> }) => {
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
    fixture = TestBed.createComponent(SchoolInquiryInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    prepare(defaultMatDialogData);
    expect(component).toBeTruthy();
  });
});
