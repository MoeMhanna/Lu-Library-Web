import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MajorsActions } from '../+state/majors.actions';

@Component({
  templateUrl: 'major-for-creation-modal.html',
  styleUrls: ['major-for-creation-modal.scss']
})
export class MajorForCreationModal {
  public categoryControl: FormControl = new FormControl('');

  constructor(private store: Store) {
  }

  public createMajor() {
    this.store.dispatch(MajorsActions.createMajors({majorName: this.categoryControl.value}));
  }
}
