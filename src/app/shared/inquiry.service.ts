import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EditInquiryInfoComponent } from '../modules/inquiry/shared/components/edit-inquiry-info/edit-inquiry-info.component';
import { EditInstitutionsComponent } from '../modules/inquiry/shared/components/edit-institutions/edit-institutions.component';
import { EditPersonComponent } from '../modules/inquiry/shared/components/edit-person/edit-person.component';
import { WizardStorageService } from '../modules/wizard/shared';
import { ApplicantType } from './applicant-type.enum';
import { CommonService } from './common.service';
import { DublicatesFinder } from './dublicates-finder';
import { HttpInterceptor } from './http-interceptor';
import { AgeGroup } from './models/age-group';
import { DistributionParams } from './models/distribution-params';
import { Guid } from './models/guid';
import { Inquiry } from './models/inquiry';
import { InquiryInfo } from './models/inquiry-info';
import { Parent } from './models/parent';
import { PortalIdentity } from './models/portal-identity';
import { RegisterSource } from './models/register-source.enum';
import { Status } from './models/status';
import { StayMode } from './models/stay-mode';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseUrl = "app/inquiries"
  constructor(private http: HttpInterceptor, private storageService: WizardStorageService, private commonService: CommonService) { }

  saveApplicant(inquiry: Inquiry, editPersonComponent: EditPersonComponent, update: (patch: object) => void): void {
    if (inquiry.applicantType != ApplicantType.Applicant) return;

    let applicant = this.commonService.buildApplicant(editPersonComponent, inquiry.applicantType);
    if (DublicatesFinder.betweenApplicantParent(inquiry.applicant, inquiry.parent)) return;
    if (DublicatesFinder.betweenApplicantChildren(applicant, inquiry.children)) return;
    if (DublicatesFinder.betweenChildren(inquiry.children)) return;
    update({ applicant: applicant });
  }

  saveParent(inquiry: Inquiry, editPersonComponent: EditPersonComponent, update: (patch: object) => void, addCondition: boolean = true): void {
    let parent: Parent;
    if (inquiry.applicantType == ApplicantType.Parent && addCondition) {
      parent = this.commonService.buildParent(editPersonComponent, inquiry.applicantType);
      if (DublicatesFinder.betweenParentChildren(parent, inquiry.children)) return;
    } else if (inquiry.applicantType == ApplicantType.Applicant && addCondition) {
      parent = this.commonService.buildParent(editPersonComponent, inquiry.applicantType);
      if (DublicatesFinder.betweenApplicantParent(inquiry.applicant, parent)) return;
      if (DublicatesFinder.betweenApplicantChildren(inquiry.applicant, inquiry.children)) return;
      if (DublicatesFinder.betweenParentChildren(parent, inquiry.children)) return;
    }
    if (!!parent) update({ parent: parent });
  }

  saveInquiryInfo(editInquiryInfoComponent: EditInquiryInfoComponent, update: (patch: object) => void): void {
    const inquiryInfo = (() => {
      const distributionParams = DistributionParams.constructFromForm(editInquiryInfoComponent.distributionParamsComponent.inquiryInfoForm);
      const stayMode = StayMode.constructFromForm(editInquiryInfoComponent.stayModeComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
      const ageGroup = AgeGroup.constructFromForm(editInquiryInfoComponent.ageGroupComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
      return new InquiryInfo(distributionParams, stayMode, ageGroup);
    })();
    update({ inquiryInfo: inquiryInfo });
  }

  saveWishInstitutions(editInstitutionComponent: EditInstitutionsComponent, update: (patch: object) => void): void {
    const institutions = (() => {
      return editInstitutionComponent.selectedInstitutions;
    })();
    update({ institutions: institutions });
  }

  create(inquiry: Inquiry): Observable<Inquiry> {
    // let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    // inquiry.id = Guid.newGuid();
    // return this.http.post(this.baseUrl, inquiry, options).pipe(map(result => {
    //   return <Inquiry>result.json();
    // }));
    inquiry.id = Guid.newGuid();
    inquiry.version = new Date();
    inquiry.registerDateTime = new Date();
    inquiry.number = "46205/ЗЗ/18091213";
    inquiry.registerSource = RegisterSource.Ws;
    inquiry.addInformation = "доп. инфа по заявлению";
    inquiry.portalIdentity = new PortalIdentity(Guid.newGuid(), "123 внешний id");
    inquiry.status = new Status(Guid.newGuid(), "Новое");
    this.storageService.set("preschool", inquiry);
    return of(this.storageService.get("preschool"));
  }

  get(id: string): BehaviorSubject<Inquiry> {
    if (!id) return Observable.create();
    return new BehaviorSubject<Inquiry>(this.storageService.get("preschool"));
    // const url = `${this.baseUrl}?id=${id}`;
    // return this.http.get(url).pipe(map(result => {
    //   const inquiries = <Array<Inquiry>>result.json();
    //   return inquiries[0];
    // }));
  }
}
