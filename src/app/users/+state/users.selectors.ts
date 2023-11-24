import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DEFENDER_USERS_KEY, DefenderUsersState } from './users.reducers';

export const selectDefenderUsers = createFeatureSelector<DefenderUsersState>(DEFENDER_USERS_KEY);
export const selectDefenderUsersLoaded = createSelector(selectDefenderUsers, (state: DefenderUsersState) => state);


