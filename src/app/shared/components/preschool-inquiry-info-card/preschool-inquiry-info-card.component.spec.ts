import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreschoolInquiryInfoCardComponent } from './preschool-inquiry-info-card.component';

describe('PreviewInquiryInfoComponent', () => {
  let component: PreschoolInquiryInfoCardComponent;
  let fixture: ComponentFixture<PreschoolInquiryInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreschoolInquiryInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreschoolInquiryInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
