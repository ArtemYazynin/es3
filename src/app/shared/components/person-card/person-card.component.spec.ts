import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCardComponent } from './person-card.component';
import { DrawService, CommonService, InquiryService } from '../..';
import { MatDialog } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../person.service';
import { PetitionService } from '../../petition.service.';

describe('PersonCardComponent', () => {
  let component: PersonCardComponent;
  let fixture: ComponentFixture<PersonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonCardComponent ],
      providers:[DrawService,MatDialog,CommonService,ChangeDetectorRef,InquiryService,ActivatedRoute,PersonService,PetitionService]
    })
    .compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
