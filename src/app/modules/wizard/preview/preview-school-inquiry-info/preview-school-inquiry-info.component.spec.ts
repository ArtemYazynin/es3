import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSchoolInquiryInfoComponent } from './preview-school-inquiry-info.component';

describe('PreviewSchoolInquiryInfoComponent', () => {
  let component: PreviewSchoolInquiryInfoComponent;
  let fixture: ComponentFixture<PreviewSchoolInquiryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewSchoolInquiryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewSchoolInquiryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
