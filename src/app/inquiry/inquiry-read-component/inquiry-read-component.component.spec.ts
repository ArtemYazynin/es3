import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryReadComponentComponent } from './inquiry-read-component.component';

describe('InquiryReadComponentComponent', () => {
  let component: InquiryReadComponentComponent;
  let fixture: ComponentFixture<InquiryReadComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryReadComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryReadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
