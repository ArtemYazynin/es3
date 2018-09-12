import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignCitizensAddressesComponent } from './foreign-citizens-addresses.component';

describe('ForeignCitizensAddressesComponent', () => {
  let component: ForeignCitizensAddressesComponent;
  let fixture: ComponentFixture<ForeignCitizensAddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignCitizensAddressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignCitizensAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
