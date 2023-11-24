import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DefenderUsersActions } from './defender-users.actions';
import { of, switchMap, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ProfilePictureService } from '@defender/profile-picture';
import { DefenderUserService } from '@defender/defender-users';
import { TemplateItemInterface } from '@defender/limit-template';
import { DefenderUserModel } from '@defender/clients';

@Injectable()
export class UsersEffects {
	public $loadDefenderUserList = createEffect(() => this.actions$
		.pipe(
			ofType(DefenderUsersActions.loadDefenderUsers),
			switchMap((action) => {
				return this.defenderUserService.getDefenderUsers(action.selectedDefenderUserId)
					.pipe(
						map((list: Array<Partial<TemplateItemInterface<DefenderUserModel>>>) =>
							DefenderUsersActions.loadDefendersUsersSuccess({ list })),
						catchError((error) => of(DefenderUsersActions.loadDefenderUsersError({ error })))
					);
			})
		)
	);

	public deleteDefenderUser = createEffect(() => this.actions$
		.pipe(
			ofType(DefenderUsersActions.deleteDefenderUser),
			switchMap((action) => {
				return this.defenderUserService
					.deleteDefenderUser(action.defenderUserId)
					.pipe(
						tap(() => {
							const message = this.translateService.instant("defenderUser.toast.defenderUserDeletedWithSuccess");
							this.toastrService.success(message);
						}),
						switchMap(() => [
							DefenderUsersActions.loadDefenderUsers({}),
							DefenderUsersActions.deleteDefenderUserSuccess()]),
						catchError((error) => {
							const message = this.translateService.instant("defenderUser.toast.couldNotDeleteDefenderUser");
							this.toastrService.error(message);
							return of(DefenderUsersActions.deleteDefenderUserError({ error }));
						})
					);
			})
		)
	);

	constructor(private actions$: Actions,
				private defenderUserService: DefenderUserService,
				private profilePictureService: ProfilePictureService,
				private translateService: TranslateService,
				private toastrService: ToastrService) {
	}
}
