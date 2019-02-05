import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SpecHealthService } from '../..';
import { esConstant, SERVER_URL } from '../../../app.module';
import { MaterialModule } from '../../../material.module';
import { CommonService } from '../../common.service';
import { InquiryService } from '../../inquiry.service';
import { SpecHealthComponent } from './spec-health.component';

fdescribe('SpecHealthComponent', () => {
  let component: SpecHealthComponent;
  let fixture: ComponentFixture<SpecHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, MaterialModule, HttpClientTestingModule, NoopAnimationsModule, MatSelectModule],
      providers: [SpecHealthService, InquiryService, CommonService,
        { provide: SERVER_URL, useValue: "http://localhost:3500" },
        { provide: esConstant, useValue: {} },],
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
