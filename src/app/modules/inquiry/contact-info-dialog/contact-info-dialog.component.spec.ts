import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { ContactInfo } from '../../../shared';
import { InquiryModule } from '../inquiry.module';
import { ContactInfoDialogComponent } from './contact-info-dialog.component';
import { DialogButtonsComponent } from '../dialog-buttons/dialog-buttons.component';


describe('ContactInfoDialogComponent', () => {
  let component: ContactInfoDialogComponent;
  let fixture: ComponentFixture<ContactInfoDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };
  const defaultMatDialogData = { $contactInfo: new BehaviorSubject<ContactInfo>(new ContactInfo(true, true, true, "mail@mail.ru", "+79277610501", "9277610502,9378520502")) };
  let prepare = (matDialogData: { $contactInfo: BehaviorSubject<ContactInfo> }) => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDialogModule, InquiryModule],
      declarations: [],
      providers: [
        MatDialog,
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: matDialogData
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ContactInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    prepare(defaultMatDialogData);
    expect(component).toBeTruthy();
    expect(component.config).toBeTruthy();
    expect(component.config.primaryTitle).toEqual(DialogButtonsComponent.defaultSave);
    expect(component.config.inverseTitle).toEqual(DialogButtonsComponent.defaultInverse);
  });

  it('editContactInfoComponent.contactInfo. Should have contactInfo', () => {
    prepare(defaultMatDialogData);
    expect(component.editContactInfoComponent.contactInfo).toEqual(defaultMatDialogData.$contactInfo.getValue());
  });

  it("config.inverseAction. Should call close dialog",()=>{
    prepare(defaultMatDialogData);
    component.config.inverseAction();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it("config.primaryAction. Should call: close dialog, next with default parameter.",()=>{
    prepare(defaultMatDialogData);
    spyOn(component.data.$contactInfo, "next");
    spyOn(component.editContactInfoComponent, "getResult").and.callThrough();
    component.config.primaryAction();

    expect(component.editContactInfoComponent.getResult).toHaveBeenCalled();
    expect(component.data.$contactInfo.next).toHaveBeenCalledWith(defaultMatDialogData.$contactInfo.getValue());
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it("isValid. Should return true and call editContactInfoComponent.isValid.",()=>{
    prepare(defaultMatDialogData);
    spyOn(component.editContactInfoComponent, "isValid").and.callThrough();
    component.editContactInfoComponent.contactsForm.markAsDirty();
    const isValid = component.isValid();

    expect(isValid).toBe(true);
    expect(component.editContactInfoComponent.isValid).toHaveBeenCalled();
  });

  it("isValid. Should return false and call editContactInfoComponent.isValid.",()=>{
    prepare(defaultMatDialogData);
    expect(component.isValid()).toBe(false);
  });

});
