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
import { Inquiry, ConfigsOfRoutingButtons, ButtonsTitles, Parent, IdentityCard, RelationType, DublicatesFinder, ApplicantType, ConfirmationDocument } from '../../../shared';
import { Guid } from '../../../shared/models/guid';

describe('ParentStepComponent', () => {
  let component: ParentStepComponent;
  let fixture: ComponentFixture<ParentStepComponent>;
  const defaultParent = new Parent("", "", "", "", false, new Date(), "", 1);
  const customParent = new Parent("customParentLastname", "customParentFirstname", "", "", false, new Date(), "", 1);
  const getConfig = "getConfig";

  const prepare = (inquiry?: Inquiry, preDetectChanges?: () => void) => {
    const defaultActivatedRouteMock = {
      snapshot: {
        data: {
          resolved: {
            inquiry: inquiry || {}
          }
        }
      }
    }
    TestBed.configureTestingModule({
      imports: [FormsModule, ShareModule, MatCheckboxModule, WizardModule, HttpClientTestingModule, NoopAnimationsModule],
      declarations: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: defaultActivatedRouteMock
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj("", ["navigate"])
        },
        { provide: SERVER_URL, useValue: "http://localhost:3500" },
        { provide: esConstant, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(ParentStepComponent);
    component = fixture.componentInstance;
    if (preDetectChanges) preDetectChanges();
    fixture.detectChanges();
  }

  it('should create', () => {
    prepare(undefined, () => {
      const val = jasmine.createSpyObj("config", ["inverseAction", "primaryAction"]);
      spyOn<any>(component, getConfig).and.returnValue(val);
    });

    expect(component).toBeTruthy();
    expect(component.agree).toBeFalsy();
    expect(component[getConfig]).toHaveBeenCalled();
    expect(component.config).toBeDefined();
  });

  it("getConfig(inverseAction), should call navigate", () => {
    prepare();
    component.config.inverseAction();
    expect(component["router"].navigate).toHaveBeenCalled();
  });

  it("getConfig(primaryAction), should call", () => {
    prepare();
    spyOn<any>(component, "getParent");
    spyOn<any>(component, "hasDublicates");
    spyOn<any>(component, "updateInquiry");
    component.config.primaryAction();
    expect(component["router"].navigate).toHaveBeenCalled();
    expect(component["getParent"]).toHaveBeenCalled();
    expect(component["hasDublicates"]).toHaveBeenCalled();
    expect(component["updateInquiry"]).toHaveBeenCalled();
  });

  it('should agree is true', () => {
    prepare((() => {
      const inquiry = new Inquiry();
      inquiry.parent = {} as Parent;
      return inquiry;
    })());
    expect(component.agree).toBeTruthy();
  });

  it(`${getConfig}, should return config with props.`, () => {
    prepare();
    const config: ConfigsOfRoutingButtons = component[getConfig]();
    expect(config).toBeTruthy();
    expect(config instanceof ConfigsOfRoutingButtons).toBeTruthy();
    expect(config.primaryTitle).toEqual(ButtonsTitles.Next);
    expect(config.inverseTitle).toEqual(ButtonsTitles.Back);
    expect(config.primaryAction).toBeDefined();
    expect(config.inverseAction).toBeDefined();
  });

  it("isValid, should call isValid of viewChildren components.", () => {
    prepare();
    spyOn(component.editCitizenshipsComponent, "isValid").and.returnValue(true);
    spyOn(component.editPersonComponent, "isValid").and.returnValue(true);
    spyOn(component.relationTypeComponent, "isValid").and.returnValue(true);
    component.isValid();
    expect(component.editCitizenshipsComponent.isValid).toHaveBeenCalled();
    expect(component.editPersonComponent.isValid).toHaveBeenCalled();
    expect(component.relationTypeComponent.isValid).toHaveBeenCalled();
  });

  it("updateInquiry, parent is defined. Should defined inquiry.parent", () => {
    prepare();
    expect(component.inquiry.parent).toBeUndefined();
    component["updateInquiry"](customParent);
    expect(component.inquiry.parent).toEqual(customParent);
  })

  it("updateInquiry, parent & inquiry.parent is defined. Should undefined inquiry.parent", () => {
    prepare((() => {
      const inquiry = new Inquiry();
      inquiry.parent = Object.assign(new Parent("", "", "", "", false), defaultParent);
      return inquiry;
    })());
    expect(component.inquiry.parent).toEqual(defaultParent);
    component["updateInquiry"](customParent);
    expect(component.inquiry.parent).toEqual(customParent);
  });

  it("updateInquiry, parent is NOT defined. Should undefined inquiry.parent", () => {
    prepare();
    expect(component.inquiry.parent).toBeUndefined();
    component["updateInquiry"](undefined);
    expect(component.inquiry.parent).toEqual(undefined);
  });

  it("getParent, should return parent.", () => {
    prepare((() => {
      const inquiry = new Inquiry();
      inquiry.applicantType = ApplicantType.Parent;
      inquiry.parent = Object.assign(new Parent("", "", "", "", false), defaultParent);
      inquiry.parent.relationType = new RelationType(Guid.newGuid(), "мать", true);
      inquiry.parent.parentRepresentChildrenDocument = new ConfirmationDocument("test", "1111", "123456", new Date(), new Date())
      return inquiry;
    })(), () => {
      spyOn(component.editCitizenshipsComponent, "getResult").and.returnValue(Object.create(null));
      spyOn(component.editPersonComponent.fullnameComponent, "getResult").and.returnValue({
        lastname: "lastname",
        firstname: "firstname",
        middlename: "middlename"
      });

      spyOn(component.editPersonComponent.identityCardComponent, "getResult");

    });
    spyOn(component.relationTypeComponent.editConfirmationDocumentComponent, "getResult").and.returnValue({});


    const parent = component["getParent"]();
    expect(parent).toBeTruthy();
  });

  it("hasDublicates, parent not defined. Should return true.", () => {
    prepare();
    expect(component["hasDublicates"](undefined)).toBeTruthy();
  });

  it("hasDublicates, applicantType=Parent and child equal parent. Should return true.", () => {
    spyOn(DublicatesFinder, "betweenParentChildren").and.returnValue(true)
    prepare((() => {
      const inquiry = new Inquiry();
      inquiry.applicantType = ApplicantType.Parent;
      return inquiry;
    })());
    expect(component["hasDublicates"]({} as Parent)).toBeTruthy();
  });

  it("hasDublicates, applicantType=Applicant and betweenApplicantParent=true. Should return true", () => {
    spyOn(DublicatesFinder, "betweenApplicantChildren").and.returnValue(false);
    spyOn(DublicatesFinder, "betweenParentChildren").and.returnValue(false);
    spyOn(DublicatesFinder, "betweenApplicantParent").and.returnValue(true);
    prepare((() => {
      const inquiry = new Inquiry();
      inquiry.applicantType = ApplicantType.Applicant;
      return inquiry;
    })());
    expect(component["hasDublicates"]({} as Parent)).toBeTruthy();
  });

  it("hasDublicates, applicantType=Applicant and betweenApplicantChildren=true. Should return true", () => {
    spyOn(DublicatesFinder, "betweenApplicantChildren").and.returnValue(true);
    spyOn(DublicatesFinder, "betweenParentChildren").and.returnValue(false);
    spyOn(DublicatesFinder, "betweenApplicantParent").and.returnValue(false);
    prepare((() => {
      const inquiry = new Inquiry();
      inquiry.applicantType = ApplicantType.Applicant;
      return inquiry;
    })());
    expect(component["hasDublicates"]({} as Parent)).toBeTruthy();
  });

  it("hasDublicates, applicantType=Applicant and betweenParentChildren=true. Should return true", () => {
    spyOn(DublicatesFinder, "betweenApplicantChildren").and.returnValue(false);
    spyOn(DublicatesFinder, "betweenParentChildren").and.returnValue(true);
    spyOn(DublicatesFinder, "betweenApplicantParent").and.returnValue(false);
    prepare((() => {
      const inquiry = new Inquiry();
      inquiry.applicantType = ApplicantType.Applicant;
      inquiry.parent = Object.assign(new Parent("", "", "", "", false), defaultParent);
      return inquiry;
    })());
    expect(component["hasDublicates"]({} as Parent)).toBeTruthy();
  });

  it("hasDublicates. Should return false.", () => {
    prepare((() => {
      const inquiry = new Inquiry();
      inquiry.applicantType = ApplicantType.Child;
      return inquiry;
    })());
    expect(component["hasDublicates"]({} as Parent)).toBeFalsy();
  });

  it("getUrl, applicantType = Applicant. Should return applicantStep url", () => {
    prepare((()=>{
      const inquiry = new Inquiry();
      inquiry.applicantType = ApplicantType.Applicant;
      return inquiry;
    })());
    expect(component["getUrl"]()).toEqual("../applicantStep")
  });

  it("getUrl, applicantType = Parent. Should return applicantTypeStep url", () => {
    prepare((()=>{
      const inquiry = new Inquiry();
      inquiry.applicantType = ApplicantType.Parent;
      return inquiry;
    })());
    expect(component["getUrl"]()).toEqual("../applicantTypeStep")
  });
});
