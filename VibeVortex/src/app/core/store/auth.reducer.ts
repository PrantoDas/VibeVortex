import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialAuthState, AuthState } from '../models/auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, { token, decodedToken }) => ({
    ...state,
    token: token,
    decodedToken: decodedToken,
    isAuthenticated: true,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    decodedToken: null,
    isAuthenticated: false,
  }))
);
