import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentStepComponent } from './parent-step.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../../../share.module';
import { MatCheckboxModule } from '@angular/material';
import { WizardModule } from '../wizard.module';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SERVER_URL, esConstant } from '../../../app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ParentStepComponent', () => {
  let component: ParentStepComponent;
  let fixture: ComponentFixture<ParentStepComponent>;

  beforeEach(async(() => {
    const activatedRouteMock = {
      snapshot: {
        data: {
          resolved: {
            inquiry: {

            }
          }
        }
      }
    }
    TestBed.configureTestingModule({
      imports: [FormsModule, ShareModule, MatCheckboxModule, WizardModule,HttpClientTestingModule,NoopAnimationsModule],
      declarations: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: Router,
          useValue: {}
        },
        { provide: SERVER_URL, useValue: "http://localhost:3500" },
        { provide: esConstant, useValue: {} }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
