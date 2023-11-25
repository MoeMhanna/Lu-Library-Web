import { createFeatureSelector, createSelector } from '@ngrx/store';

import { USERS_KEY, UsersState } from './users.reducers';

export const selectUsers = createFeatureSelector<UsersState>(USERS_KEY);
export const selectUsersLoaded = createSelector(selectUsers, (state: UsersState) => state);


