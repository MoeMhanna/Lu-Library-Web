import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UsersAction } from './users.actions';
import { UsersService } from '../service/users.service';
import { UserModel } from '../client/model/user.model';

@Injectable()
export class UsersEffects {
  public $loadDefenderUserList = createEffect(() => this.actions$
    .pipe(
      ofType(UsersAction.loadUsers),
      switchMap((action) => {
        return this.usersService.getUsers()
          .pipe(
            map((userList: Array<UserModel>) => {
              return UsersAction.loadUsersSuccess({userList});
            }),
            catchError((error) => of(UsersAction.loadUsersError({error})))
          )
      })
    )
  );

  public $getUserById = createEffect(() => this.actions$
    .pipe(
      ofType(UsersAction.loadUserById),
      switchMap((action) => {
        return this.usersService.getUserById(action.selectedUserId)
          .pipe(
            map((user: UserModel) => {
              return UsersAction.loadUserByIdSuccess({user});
            }),
            catchError((error) => of(UsersAction.loadUserByIdError({error})))
          )
      })
    )
  );

  public $deleteUser = createEffect(() => this.actions$
    .pipe(
      ofType(UsersAction.deleteUser),
      switchMap((action) => {
        return this.usersService.deleteUser(action.id)
          .pipe(
            switchMap(() => [UsersAction.loadUsers(), UsersAction.deleteUserSuccess()]),
            catchError((error) => {
              return of(UsersAction.deleteUserError({error}));
            })
          )
      })
    )
  );

  public $createUser = createEffect(() => this.actions$
    .pipe(
      ofType(UsersAction.createUser),
      switchMap((action) => {
        return this.usersService.createUser(action.user)
          .pipe(
            switchMap(() => [UsersAction.loadUsers(), UsersAction.createUserSuccess()]),
            catchError((error) => {
              return of(UsersAction.createUserError({error}));
            })
          )
      })
    )
  );

  constructor(private actions$: Actions,
              private usersService: UsersService) {
  }
}
