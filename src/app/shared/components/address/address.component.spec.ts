import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponent } from './address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { AddressService } from '../../address.service';
import { DrawService } from '../../draw.service';

fdescribe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let addressServiceStub = jasmine.createSpyObj("AddressService", ["getRegions", "getCities", "getDistricts", "getStreets", "getBuildings"]);
  let drawServiceStub = jasmine.createSpyObj("DrawService",["address"]);
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatSelectModule, MatTooltipModule],
      providers: [
        {
          provide: AddressService,
          useValue: addressServiceStub
        },
        {
          provide:DrawService,
          useValue: drawServiceStub
        }
      ],
      declarations: [AddressComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
