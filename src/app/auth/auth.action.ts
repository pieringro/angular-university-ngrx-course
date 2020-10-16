
import { createAction, props } from '@ngrx/store';
import { User } from './model/user.model';

// this is an action creator
// you have to call login({user}) to create an action
export const login = createAction(
    "[Login Page] User Login",
    props<{ user: User }>()
);

export const logout = createAction(
    "[Top Menu] Logout"
);