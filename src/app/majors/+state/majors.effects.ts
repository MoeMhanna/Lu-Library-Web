import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MajorsActions } from './majors.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { MajorServices } from '../services/major.services';
import { MajorsBo } from '../bo/majors.bo';

@Injectable()
export class MajorsEffects {
  public $loadMajors = createEffect(() => this.actions$
    .pipe(
      ofType(MajorsActions.loadMajors),
      switchMap((action) => {
        return this.majorServices.getMajors()
          .pipe(
            map((majorsBosList: Array<MajorsBo>) => {
              return MajorsActions.loadMajorsSuccess({majorsBoList: majorsBosList});
            }),
            catchError((error) => of(MajorsActions.loadMajorsError({error})))
          )
      })
    )
  );


  // public $createMajors = createEffect(() => this.actions$
  //   .pipe(
  //     ofType(MajorsActions.createMajors),
  //     switchMap((action) => {
  //       return this.majorServices.createMajors(action.majorName)
  //         .pipe(
  //           switchMap(() => [
  //             MajorsActions.loadMajors(),
  //             MajorsActions.createMajorsSuccess()
  //           ]),
  //           catchError((error) => {
  //             return of(MajorsActions.createMajorsError({error}));
  //           })
  //         )
  //     })
  //   )
  // );

  public $deleteMajors = createEffect(() => this.actions$
    .pipe(
      ofType(MajorsActions.deleteMajors),
      switchMap((action) => {
        return this.majorServices.deleteMajor(action.majorId)
          .pipe(
            switchMap(() => [
              MajorsActions.loadMajors(),
              MajorsActions.deleteMajorsSuccess()
            ]),
            catchError((error) => {
              return of(MajorsActions.deleteMajorsError({error}));
            })
          )
      })
    )
  );

  constructor(private actions$: Actions,
              private majorServices: MajorServices) {
  }
}
