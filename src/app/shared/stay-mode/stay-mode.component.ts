import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '../../../../node_modules/@angular/forms';
import { SpecificityService, FormService } from '../index';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-stay-mode',
  templateUrl: './stay-mode.component.html',
  styleUrls: ['./stay-mode.component.css']
})
export class StayModeComponent implements OnInit,OnDestroy {
  
  stayModeForm: FormGroup;
  hasErrorSubscription:Subscription;
  checkboxes:Array<string> = ["IsFullStay","IsNightStay","IsShortStay","IsReducedStay","IsExtendedStay"];
  constructor(private formService: FormService, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
  ngOnDestroy(): void {
    this.hasErrorSubscription.unsubscribe();
  }
  private buildForm() {
    let checkboxesConfig = (()=>{
      let result = {};
      this.checkboxes.forEach(name => {
        result[name] = [false, []];
      });
      return result;
    })();
    let controlsConfig = Object.assign({}, checkboxesConfig, {"hasError":[ false, [] ]});
    this.stayModeForm = this.fb.group(controlsConfig);

    let toggle = (form?)=>{
      if(!form) return;
      let control = this.stayModeForm.get("hasError");
      if (form.IsFullStay || form.IsNightStay || form.IsShortStay 
        || form.IsReducedStay || form.IsExtendedStay || form.IsExtendedStay) {
          control.clearValidators();
          control.updateValueAndValidity();
      }else{

      }
    }
    this.stayModeForm.valueChanges.subscribe(toggle);
    toggle();
  }
}