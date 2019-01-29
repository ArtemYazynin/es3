import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { esConstant, SERVER_URL } from '../../../app.module';
import { Privilege } from '../../../shared';
import { InquiryModule } from '../inquiry.module';
import { PrivilegeDialogComponent } from './privilege-dialog.component';


describe('PrivilegeDialogComponent', () => {
  let component: PrivilegeDialogComponent;
  let fixture: ComponentFixture<PrivilegeDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  const defaultMatDialogData = {
    $privilege: new BehaviorSubject<Privilege>(new Privilege())
  };

  let prepare = (matDialogData: { $privilege: BehaviorSubject<Privilege> }) => {
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
    fixture = TestBed.createComponent(PrivilegeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    prepare(defaultMatDialogData);
    expect(component).toBeTruthy();
  });
});
