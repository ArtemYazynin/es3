import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { esConstant, SERVER_URL } from '../../../app.module';
import { inquiryType, Person } from '../../../shared';
import { PersonType } from '../../../shared/person-type.enum';
import { InquiryModule } from '../inquiry.module';
import { EditPersonDialogComponent } from './edit-person-dialog.component';


describe('EditPersonDialogComponent', () => {
  let component: EditPersonDialogComponent;
  let fixture: ComponentFixture<EditPersonDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  const defaultMatDialogData = {
    $person: new BehaviorSubject<Person>(
      new Person("q", "w", "e", "123", false, new Date(), "г. Самара", 1)),
    personType: PersonType.Parent,
    inquiryType: inquiryType.preschool
  };

  let prepare = (matDialogData: { $person: BehaviorSubject<Person>, personType: PersonType, inquiryType: string }) => {
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
    fixture = TestBed.createComponent(EditPersonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    prepare(defaultMatDialogData);
    expect(component).toBeTruthy();
  });
});
