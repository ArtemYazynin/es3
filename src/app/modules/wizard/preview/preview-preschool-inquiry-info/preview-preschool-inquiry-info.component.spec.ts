import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPreschoolInquiryInfoComponent } from './preview-preschool-inquiry-info.component';

describe('PreviewInquiryInfoComponent', () => {
  let component: PreviewPreschoolInquiryInfoComponent;
  let fixture: ComponentFixture<PreviewPreschoolInquiryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPreschoolInquiryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPreschoolInquiryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
