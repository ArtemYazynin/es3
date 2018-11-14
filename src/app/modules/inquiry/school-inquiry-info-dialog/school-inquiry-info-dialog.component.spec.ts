import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInquiryInfoDialogComponent } from './school-inquiry-info-dialog.component';

describe('SchoolInquiryInfoDialogComponent', () => {
  let component: SchoolInquiryInfoDialogComponent;
  let fixture: ComponentFixture<SchoolInquiryInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolInquiryInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolInquiryInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
