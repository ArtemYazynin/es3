import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfCitizensAddressesComponent } from './rf-citizens-addresses.component';

describe('RfCitizensAddressesComponent', () => {
  let component: RfCitizensAddressesComponent;
  let fixture: ComponentFixture<RfCitizensAddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfCitizensAddressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfCitizensAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
