import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPreschoolInquiryInfoComponent } from './edit-preschool-inquiry-info.component';

describe('EditPreschoolInquiryInfoComponent', () => {
  let component: EditPreschoolInquiryInfoComponent;
  let fixture: ComponentFixture<EditPreschoolInquiryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPreschoolInquiryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPreschoolInquiryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
