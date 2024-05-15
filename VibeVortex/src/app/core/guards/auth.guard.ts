import { Inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Import your AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  authGuard: CanActivateFn = (route, state) => {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  };
}
