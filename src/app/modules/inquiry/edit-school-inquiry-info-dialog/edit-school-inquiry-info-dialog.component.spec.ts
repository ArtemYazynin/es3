import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolInquiryInfoDialogComponent } from './edit-school-inquiry-info-dialog.component';

describe('EditSchoolInquiryInfoDialogComponent', () => {
  let component: EditSchoolInquiryInfoDialogComponent;
  let fixture: ComponentFixture<EditSchoolInquiryInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSchoolInquiryInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchoolInquiryInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
