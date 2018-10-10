import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInquiryInfoCardComponent } from './school-inquiry-info-card.component';

describe('SchoolInquiryInfoCardComponent', () => {
  let component: SchoolInquiryInfoCardComponent;
  let fixture: ComponentFixture<SchoolInquiryInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolInquiryInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolInquiryInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
