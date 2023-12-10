import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionButtonInterface } from '../shared/components/action-button/interface/action-button.interface';
import { Store } from '@ngrx/store';
import { MajorsActions } from './+state/majors.actions';
import { selectMajorsLoaded } from './+state/majors.selectors';
import { HttpStatusEnum } from '../shared/enums/http-status.enum';
import { MajorForCreationModal } from './major-creation-modal/major-for-creation-modal';
import { Router } from '@angular/router';

@Component({
  templateUrl: './majors-page.html',
  styleUrl: './majors-page.scss'
})
export class MajorsPage implements OnInit, OnDestroy {
  public majorsState$ = this.store.select(selectMajorsLoaded);
  public HttpStatusEnum = HttpStatusEnum;
  public createBookAction: ActionButtonInterface = {
    faIcon: ['fas', 'plus-circle'],
    label: 'Create Major',
    handler: () => {
      this.matDialog.open(MajorForCreationModal, {
        width: '500px',
        height: '300px'
      });
    }
  };

  constructor(private matDialog: MatDialog,
              private router: Router,
              public store: Store) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.store.dispatch(MajorsActions.loadMajors())
  }

  public async loadBooksCategory(categoryName: string) {
    await this.router.navigate(['/books', categoryName]);
  }
}
