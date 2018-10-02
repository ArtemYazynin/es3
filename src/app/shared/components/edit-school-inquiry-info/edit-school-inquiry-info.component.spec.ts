import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolInquiryInfoComponent } from './edit-school-inquiry-info.component';

describe('EditSchoolInquiryInfoComponent', () => {
  let component: EditSchoolInquiryInfoComponent;
  let fixture: ComponentFixture<EditSchoolInquiryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSchoolInquiryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchoolInquiryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
