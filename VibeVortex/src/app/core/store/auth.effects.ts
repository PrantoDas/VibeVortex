import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap((action) =>
                of(action).pipe(
                    map((action) => {
                        // Assuming a successful login, you might dispatch another action or return a no-op action
                        // For example, you could dispatch a success action here
                        // return AuthActions.loginSuccess({ user: decodedUser });

                        // If you don't need to dispatch another action, you can use EMPTY or a no-op action
                        return { type: '[Auth] No Operation' }; // No-op action
                        // return EMPTY; // If you don't want to dispatch any action
                    }),
                    catchError((error) => {
                        // In case of error, you might want to dispatch an error handling action
                        console.error('Login error', error);
                        return of(AuthActions.logout()); // Ensure to return an action even in the error case
                    })
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
                localStorage.removeItem('authToken');
                this.router.navigateByUrl('/login');
            })
        ),
        { dispatch: false } // Set dispatch to false since this effect does not dispatch another action
    );

    constructor(private actions$: Actions, private router: Router) { }
}