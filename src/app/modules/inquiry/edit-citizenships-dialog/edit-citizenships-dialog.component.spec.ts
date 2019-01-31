import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { esConstant, SERVER_URL } from '../../../app.module';
import { Applicant, ApplicantType, Child, Parent, ConfirmationDocument } from '../../../shared';
import { PersonType } from '../../../shared/person-type.enum';
import { DialogButtonsComponent } from '../dialog-buttons/dialog-buttons.component';
import { InquiryModule } from '../inquiry.module';
import { EditCitizenshipsDialogComponent } from './edit-citizenships-dialog.component';

describe('EditCitizenshipsDialogComponent', () => {
  let component: EditCitizenshipsDialogComponent;
  let fixture: ComponentFixture<EditCitizenshipsDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };
  const defaultDocument = new ConfirmationDocument("test", "1234", "123456", new Date(), new Date());
  let defaultParent = (() => {
    let mockParent = new Parent("q", "w", "e", "123", false, undefined, undefined, 1);
    mockParent.citizenships = [643]
    return mockParent;
  })();
  const getDefaultMatDialogData = (person?: Parent | Applicant, personType?: PersonType, applicantType?: ApplicantType) => {
    person = person || defaultParent;
    personType = personType || PersonType.Parent;
    applicantType = applicantType || ApplicantType.Parent;
    const defaultMatDialogData = {
      $person: new BehaviorSubject<any>(person),
      personType: personType,
      applicantType: ApplicantType.Parent
    };
    return defaultMatDialogData;
  }


  let prepare = (matDialogData: { $person: BehaviorSubject<Parent | Applicant | Child>, personType: PersonType, applicantType: ApplicantType }) => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDialogModule, InquiryModule, HttpClientTestingModule],
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
        },
        { provide: SERVER_URL, useValue: "http://localhost:3500" },
        { provide: esConstant, useValue: {} }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EditCitizenshipsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
  it('should create', () => {
    let data = getDefaultMatDialogData();
    prepare(data);
    expect(component).toBeTruthy();
    expect(component.config).toBeTruthy();
    expect(component.config.primaryTitle).toEqual(DialogButtonsComponent.defaultSave);
    expect(component.config.inverseTitle).toEqual(DialogButtonsComponent.defaultInverse);

    expect(component.editCitizenshipsComponent.model).toEqual(data.$person.getValue());
    expect(component.editCitizenshipsComponent.personType).toEqual(data.personType);
    expect(component.editCitizenshipsComponent.applicantType).toEqual(data.applicantType);
  });

  it("config.inverseAction. Should call close dialog", () => {
    let data = getDefaultMatDialogData();
    prepare(data);
    component.config.inverseAction();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it("config.primaryAction. Should call close/next dialog events.", () => {
    let data = getDefaultMatDialogData();
    prepare(data);
    spyOn(component.data.$person, "next");
    component.config.primaryAction();
    expect(component.data.$person.next).toHaveBeenCalledWith(data.$person.getValue());
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it("config.primaryAction, parent with countryStateDocument. .", () => {
    const countryStateDocument = "countryStateDocument";
    let parent = Object.assign({}, defaultParent);
    parent.countryStateDocument = defaultDocument;
    let data = getDefaultMatDialogData(parent);
    prepare(data);
    expect(component.data.$person.value[countryStateDocument]).toBeDefined();//before
    component.config.primaryAction();
    expect(component.data.$person.value[countryStateDocument]).toBeUndefined();//after
  });

  it('config.primaryAction', () => {
    const countryStateApplicantDocument = "countryStateApplicantDocument";
    let applicant = new Applicant("", "", "", "", false, undefined, "", 1);
    applicant.citizenships = [643];
    applicant.countryStateApplicantDocument = defaultDocument;
    let data = getDefaultMatDialogData(applicant, PersonType.Applicant);
    prepare(data);
    expect(component.data.$person.value[countryStateApplicantDocument]).toBeDefined();//before
    component.config.primaryAction();
    expect(component.data.$person.value[countryStateApplicantDocument]).toBeUndefined();//after
  });
});
