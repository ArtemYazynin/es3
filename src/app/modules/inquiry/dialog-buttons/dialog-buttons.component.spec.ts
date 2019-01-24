import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogButtonsComponent } from './dialog-buttons.component';
import { ConfigsOfRoutingButtons } from '../../../shared/configs-of-routing-buttons';

describe('DialogButtonsComponent', () => {
  it('Props should have default init.', () => {
    let component = new DialogButtonsComponent();
    expect(DialogButtonsComponent.defaultSave).toBeTruthy();
    expect(DialogButtonsComponent.defaultInverse).toBeTruthy();

    component.ngOnInit();
    expect(component.config).toBeUndefined();
    expect(component.isValid).toBeUndefined();
  });

  it('Config WITHOUT titles. Should default init titles.', () => {
    let component = new DialogButtonsComponent();
    component.config = new ConfigsOfRoutingButtons();
    component.ngOnInit();
    expect(component.config.primaryTitle).toBe(DialogButtonsComponent.defaultSave);
    expect(component.config.inverseTitle).toBe(DialogButtonsComponent.defaultInverse);
  });

  it('Config WITH titles. Should have specified titles.', () => {
    const testPrimaryTitle = "testPrimaryTitle";
    const testInverseTitle = "testInverseTitle";
    let component = new DialogButtonsComponent();
    component.config = new ConfigsOfRoutingButtons(testPrimaryTitle,testInverseTitle);
    component.ngOnInit();
    expect(component.config.primaryTitle).toBe(testPrimaryTitle);
    expect(component.config.inverseTitle).toBe(testInverseTitle);
  });
});
