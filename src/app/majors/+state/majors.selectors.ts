import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAJORS_KEY, MajorsState } from './majors.reducers';

export const selectMajors = createFeatureSelector<MajorsState>(MAJORS_KEY);
export const selectMajorsLoaded = createSelector(selectMajors, (state: MajorsState) => state);
