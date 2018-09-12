import { Injectable } from '@angular/core';
import { inquiryType } from "../../../shared/models/inquiry-type";
import { CompilationOfWizardSteps } from './compilation-of-wizard-steps';
import { isNullOrUndefined } from 'util';

@Injectable()
export class WizardStorageService {
  private prefix = "inquiry";
  get(type: string): CompilationOfWizardSteps {
    const key = this.prefix + "/" + type;
    const inquiryData = JSON.parse(sessionStorage.getItem(key));
    return inquiryData || {};
  }
  set(type: string, data?: object | Array<any>) {
    if (!inquiryType || !inquiryType[type]) return;
    const key = this.prefix + "/" + type;

    if (isNullOrUndefined(data)) {
      //sessionStorage.removeItem(key);
    } else {
      const updatedStorage = (() => {
        let storage = this.get(type);
        return Object.assign({}, storage, data);
      })();
      sessionStorage.setItem(key, JSON.stringify(updatedStorage));
    }
  }
}
