import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Petition } from '../../models/petition.model';

@Component({
  selector: 'app-petition-card',
  templateUrl: './petition-card.component.html',
  styleUrls: ['./petition-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetitionCardComponent implements OnInit {
  @Input() petition: Petition;
  @Input() edit: () => void;

  constructor() { }

  ngOnInit() {
  }

  /*
  edit() {
    let data = { $petition: new BehaviorSubject<Petition>(this.model) };
    data.$petition
      .pipe(skip(1))
      .subscribe(petition => {
        let s = this;
      })

    let config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = false;
    config.data = data;
    config.width = "1000px";
    this.dialog.open(EditPetitionDialogComponent, config);
  }
  */
}
