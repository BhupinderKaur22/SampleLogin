import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../interfaces/user-state.interface'

export interface SignInState {
    user: UserState
}

const signInFeature = createFeatureSelector<UserState>(
    'user'
);

export const getToken = createSelector(
    signInFeature,
    state => state.token
);

export const getError = createSelector(
    signInFeature,
    state => state.errorMessage
);

