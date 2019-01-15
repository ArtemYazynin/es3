import { PetitionTypePipe } from './petition-type.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';
import { CommonService } from '.';

describe('PetitionTypePipe', () => {
  let pipe: PetitionTypePipe;
  let fixture: ComponentFixture<PetitionTypePipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetitionTypePipe],
      providers:[CommonService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetitionTypePipe);
    pipe = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
