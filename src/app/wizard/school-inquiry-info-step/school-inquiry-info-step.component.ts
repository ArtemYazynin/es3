import { Component, OnInit } from '@angular/core';
import { StepBase, CommonService, Entity } from '../../shared/index';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-school-inquiry-info-step',
  templateUrl: './school-inquiry-info-step.component.html',
  styleUrls: ['./school-inquiry-info-step.component.css']
})
export class SchoolInquiryInfoStepComponent implements OnInit, StepBase {
  schoolInquiryInfoForm: FormGroup;
  displayFn = this.commonService.displayFn;
  schoolYears: Array<number> = [new Date().getFullYear(), new Date().getFullYear() + 1];
  grades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  specializations = [
    new Entity<string>("725AA48E-AF88-4AA1-B180-A452002D3E9A", "Общеобразовательный"),
    new Entity<string>("6DB6A3FA-4E83-4E74-9ED3-A452002D3EAD", "Профильный углубленный"),
    new Entity<string>("7772BD8C-071E-4012-AA89-A452002D3ED7", "Профильное обучение"),
  ];
  private schoolPrograms: Array<Entity<string>> = [
    new Entity<string>("CD230093-3C30-4A51-A681-A7F400DB7FFE", "Школьная Образовательная программа"),
    new Entity<string>("17538BA8-45E8-40C1-BD59-A452002D607F", "Программа специальная коррекционная для образовательных учреждений IV вида (для слабовидящих детей). Под редакцией Л.И. Плаксиной"),
    new Entity<string>("07E4226E-C7DE-4188-8819-A452002D607F", "От рождения до школы\" Веракса Н.Е. \""),
  ];
  filteredSchoolPrograms: Observable<Array<Entity<string>>>;
  isValid(): boolean {
    return this.schoolInquiryInfoForm && this.schoolInquiryInfoForm.valid;
  }
  goTo = {
    back: () => {
      this.router.navigate(["../privilegeStep"], { relativeTo: this.activatedRoute });
    },
    next: () => {
      this.router.navigate(["../schoolStep"], { relativeTo: this.activatedRoute });
    }
  };

  constructor(private commonService: CommonService, private fb: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.buildForm();
    this.filteredSchoolPrograms = this.schoolInquiryInfoForm.controls.program.valueChanges.pipe(
      startWith<string | Entity<string>>(''),
      map((value: Entity<string>) => typeof value === 'string' ? value : value.name),
      map((name: string) => {
        return name ? this.commonService.autoCompliteFilter(this.schoolPrograms, name) : this.schoolPrograms.slice();
      })
    );
  }

  private buildForm() {
    this.schoolInquiryInfoForm = this.fb.group({
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
  }
}
