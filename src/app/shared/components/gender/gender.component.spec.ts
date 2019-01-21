import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderComponent } from './gender.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';

fdescribe('GenderComponent', () => {
  let component: GenderComponent;
  let fixture: ComponentFixture<GenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas:[NO_ERRORS_SCHEMA],
      //imports: [FormsModule, MaterialModule],
      declarations: [ GenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize gender property value', () => {
    expect(component.gender).toEqual(1);
  });
});
