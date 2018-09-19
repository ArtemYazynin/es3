import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-at-least-one-checkbox-should-be-selected',
  templateUrl: './at-least-one-checkbox-should-be-selected.component.html',
  styleUrls: ['./at-least-one-checkbox-should-be-selected.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtLeastOneCheckboxShouldBeSelectedComponent implements OnInit {
  @Input() items: Array<{ key: string, text: string }>
  @Input() message: string;
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    let checkboxGroup = new FormArray(this.items.map(item => new FormGroup({
      id: new FormControl(item.key),
      text: new FormControl(item.text),
      checkbox: new FormControl(false)
    })));

    // create a hidden reuired formControl to keep status of checkbox group
    let hiddenControl = new FormControl(this.mapItems(checkboxGroup.value), Validators.required);
    // update checkbox group's value to hidden formcontrol
    checkboxGroup.valueChanges.subscribe((v) => {
      hiddenControl.setValue(this.mapItems(v));
    });

    this.form = new FormGroup({
      items: checkboxGroup,
      selectedItems: hiddenControl
    });
  }
  mapItems(items) {
    let selectedItems = items.filter((item) => item.checkbox).map((item) => item.id);
    return selectedItems.length ? selectedItems : null;
  }
}
