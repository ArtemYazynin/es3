import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, zip } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { CommonService, EducProgram, EducProgramService, EducProgramType, Entity, Specialization, SpecializationService } from '../..';
import { SchoolInquiryInfo } from '../../models/school-inquiry-info.model';
import { FormService } from '../../form.service';

@Component({
  selector: 'app-edit-school-inquiry-info',
  templateUrl: './edit-school-inquiry-info.component.html',
  styleUrls: ['./edit-school-inquiry-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSchoolInquiryInfoComponent implements OnInit, OnDestroy {
  @Input() schoolInquiryInfo: SchoolInquiryInfo;

  private ngUnsubscribe: Subject<any> = new Subject();
  private schoolPrograms: Array<Entity<string>> = [];
  form: FormGroup;
  formErrors = {
    educYear: "",
    grade: "",
    specialization: "",
    program: "",
  }
  validationMessages = {
    educYear: { "required": "Обязательное поле." },
    grade: { "required": "Обязательное поле." },
  }
  schoolYears: Array<number> = (() => {
    const currentYear = new Date().getFullYear();
    return [currentYear, currentYear + 1]
  })();
  grades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  specializations: Array<Specialization>;
  displayFn = this.commonService.displayFn;
  filteredPrograms: Observable<Array<Entity<string>>>;

  constructor(private commonService: CommonService, private fb: FormBuilder, private specializationService: SpecializationService,
    private educProgramService: EducProgramService, private cdr: ChangeDetectorRef, private formService: FormService) { }

  ngOnInit() {
    this.buildForm();
    let $specializations = this.specializationService.get().pipe(takeUntil(this.ngUnsubscribe));
    let $programs = this.educProgramService.get(EducProgramType.School)
      .pipe(takeUntil(this.ngUnsubscribe), map(programs => {
        programs.unshift(new EducProgram("", "Любая", "Любая", EducProgramType.School));
        return programs;
      }));
    zip($specializations, $programs).pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
      this.specializations = x[0];
      this.schoolPrograms = x[1];
      this.form.controls.program.patchValue(this.schoolPrograms.find(x => !x.id));

      this.filteredPrograms = this.form.controls.program.valueChanges.pipe(
        startWith<string | Entity<string>>(''),
        map((value: Entity<string>) => typeof value === 'string' ? value : value.name),
        map((name: string) => {
          return name ? this.commonService.autoCompliteFilter(this.schoolPrograms, name) : this.schoolPrograms.slice();
        })
      );
      this.initFromSessionStorage();
    })

  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  isValid(): boolean {
    return this.form && this.form.valid;
  }

  private initFromSessionStorage() {
    if (!this.schoolInquiryInfo) return;
    let patchValue = {
      educYear: this.schoolInquiryInfo.educYear,
      grade: this.schoolInquiryInfo.grade
    }
    if (this.schoolInquiryInfo.specialization) {
      patchValue["specialization"] = this.specializations.find(x => x.id == this.schoolInquiryInfo.specialization.id);
    }
    if (this.schoolInquiryInfo.program) {
      patchValue["program"] = this.schoolInquiryInfo.program
    }
    this.form.patchValue(patchValue);
  }
  private buildForm() {
    this.form = this.fb.group({
      "educYear": [
        "",
        [Validators.required]
      ],
      "grade": [
        "",
        [Validators.required]
      ],
      "specialization": [
        "",
        []
      ],
      "program": [
        "",
        []
      ],
    });
    this.form.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.formService.onValueChange(this.form, this.formErrors, this.validationMessages));
    this.formService.onValueChange(this.form, this.formErrors, this.validationMessages);
  }
}
