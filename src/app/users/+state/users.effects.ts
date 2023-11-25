import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { usersAction } from './users.actions';
import { UsersService } from '../service/users.service';
import { UserModel } from '../client/model/user.model';

@Injectable()
export class UsersEffects {
  public $loadDefenderUserList = createEffect(() => this.actions$
    .pipe(
      ofType(usersAction.loadUsers),
      switchMap((action) => {
        return this.usersService.getUsers()
          .pipe(
            map((userList: Array<UserModel>) => {
              return usersAction.loadUsersSuccess({userList});
            }),
            catchError((error) => of(usersAction.loadUsersError({error})))
          )
      })
    )
  );

  public $getUserById = createEffect(() => this.actions$
    .pipe(
      ofType(usersAction.loadUserById),
      switchMap((action) => {
        return this.usersService.getUserById(action.selectedUserId)
          .pipe(
            map((user: UserModel) => {
              return usersAction.loadUserByIdSuccess({user});
            }),
            catchError((error) => of(usersAction.loadUserByIdError({error})))
          )
      })
    )
  );

  public $deleteUser = createEffect(() => this.actions$
    .pipe(
      ofType(usersAction.deleteUser),
      switchMap((action) => {
        return this.usersService.deleteUser(action.id)
          .pipe(
            switchMap(() => [usersAction.loadUsers(), usersAction.deleteUserSuccess()]),
            catchError((error) => {
              return of(usersAction.deleteUserError({error}));
            })
          )
      })
    )
  );

  public $createUser = createEffect(() => this.actions$
    .pipe(
      ofType(usersAction.createUser),
      switchMap((action) => {
        return this.usersService.createUser(action.user)
          .pipe(
            switchMap(() => [usersAction.loadUsers, usersAction.createUserSuccess()]),
            catchError((error) => {
              return of(usersAction.createUserError({error}));
            })
          )
      })
    )
  );

  constructor(private actions$: Actions,
              private usersService: UsersService) {
  }
}
