import { Injectable } from '@angular/core';
import { WizardStorageService } from '../modules/wizard/shared';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class BreadsCrumbsService {

  constructor(private storageService: WizardStorageService, private activatedRoute: ActivatedRoute) {

  }
}
