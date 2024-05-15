import { createAction, props } from '@ngrx/store';
import { AuthToken } from '../models/auth.token';

export const login = createAction('[Auth] Login', props<{ token: string, decodedToken: AuthToken }>());
export const logout = createAction('[Auth] Logout');
