import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, tap } from 'rxjs';
import { MeActions } from './me.actions';
import { LoginService } from '../login-page/service/login.service';

@Injectable()
export class MeEffects {
  public $loadMe = createEffect(() => this.actions$
    .pipe(
      ofType(MeActions.loadMe),
      tap(() => {
        MeActions.loadMeSuccess({user: this.getGetTokenFromLocalStorage()});
      }),
      catchError((err) => {
        return of(MeActions.loadMeError({error: err}))
      })
    )
  );


  constructor(private actions$: Actions,
              private loginService: LoginService) {
  }

  private getGetTokenFromLocalStorage() {
    return JSON.parse(localStorage.getItem('token'));
  }
}
