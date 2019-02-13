import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { SpecHealthService } from '../..';
import { esConstant, SERVER_URL } from '../../../app.module';
import { MaterialModule } from '../../../material.module';
import { SpecHealthComponent } from './spec-health.component';

describe('SpecHealthComponent', () => {
  let component: SpecHealthComponent;
  let fixture: ComponentFixture<SpecHealthComponent>;
  let specHealthServiceStub = jasmine.createSpyObj("SpecHealthService", {
    "gets": Observable.create()
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, MaterialModule, HttpClientTestingModule, NoopAnimationsModule, MatSelectModule],
      providers: [
        { provide: SpecHealthService, useValue: specHealthServiceStub },
        { provide: SERVER_URL, useValue: "http://localhost:3500" },
        { provide: esConstant, useValue: {} }
      ],
      declarations: [SpecHealthComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
