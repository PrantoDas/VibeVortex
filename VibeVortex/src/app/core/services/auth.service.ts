import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from '../models/auth.state';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import *  as jwt_decode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { AuthToken } from '../models/auth.token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<{ auth: AuthState }>) { }

  login(token: string): void {
    const decoded: AuthToken = jwt_decode.jwtDecode(token);
    this.store.dispatch(AuthActions.login({
      token: token,
      decodedToken: decoded
    }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  isLoggedIn(): Observable<boolean> {
    return this.store.select('auth').pipe(
      map((authState) => {
        if (authState.token && authState.decodedToken) {
          return authState.decodedToken.exp > Date.now() / 1000;
        }
        return false;
      })
    );
  }

  getToken(): Observable<string | null> {
    return this.store.select('auth').pipe(
      map((authState) => {
        return authState.token;
      })
    );
  }

  initAuthState() {
    let token = localStorage.getItem('authToken');
    if (token) {
      this.login(token);
    }
  }
}
