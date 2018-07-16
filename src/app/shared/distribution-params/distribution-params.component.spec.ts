import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionParamsComponent } from './distribution-params.component';

describe('DistributionParamsComponent', () => {
  let component: DistributionParamsComponent;
  let fixture: ComponentFixture<DistributionParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
