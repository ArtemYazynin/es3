import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { esConstant, SERVER_URL } from '../../../app.module';
import { Child, SpecHealth } from '../../../shared';
import { InquiryModule } from '../inquiry.module';
import { SpecHealthDialogComponent } from './spec-health-dialog.component';

describe('SpecHealthDialogComponent', () => {
  let component: SpecHealthDialogComponent;
  let fixture: ComponentFixture<SpecHealthDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  const defaultMatDialogData = {
    $specHealth: new BehaviorSubject<SpecHealth>(undefined),
    $children: new Array<BehaviorSubject<Child>>()
  };
  let prepare = (matDialogData: { $specHealth: BehaviorSubject<SpecHealth>, $children: Array<BehaviorSubject<Child>> }) => {
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
    fixture = TestBed.createComponent(SpecHealthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    prepare(defaultMatDialogData);
    expect(component).toBeTruthy();
  });
});
