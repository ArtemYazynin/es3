import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInquiryInfoComponent } from './preview-inquiry-info.component';

describe('PreviewInquiryInfoComponent', () => {
  let component: PreviewInquiryInfoComponent;
  let fixture: ComponentFixture<PreviewInquiryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewInquiryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewInquiryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
