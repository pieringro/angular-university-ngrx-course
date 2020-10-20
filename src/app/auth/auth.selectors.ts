import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthState } from './reducers';

// selectors are essentialy queries that we are issuing against the store

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
    selectAuthState,
    auth => !!auth.user
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    auth => !auth
);
