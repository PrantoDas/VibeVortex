import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, switchMap, take } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      take(1), // Take the first value emitted by the Observable and complete
      switchMap((authToken) => {
        if (authToken) {
          const authRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${authToken}`)
          });
          return next.handle(authRequest);
        }
        return next.handle(request);
      })
    );
  }
}
