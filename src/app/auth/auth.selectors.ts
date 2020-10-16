import {createSelector} from '@ngrx/store'

export const isLoggedIn = createSelector(
    state => state["auth"], // this can be a feature selector
    auth => !!auth.user
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    auth => !auth
);
