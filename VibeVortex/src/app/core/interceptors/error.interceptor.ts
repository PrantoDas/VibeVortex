import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = 'There was a problem with your request. Please check your network connection and try again.';
        } else {
          // Server-side error
          if (error.status === 0) {
            errorMessage = 'Unable to connect to the server. Please check your internet connection or try again later.';
          } else if (error.status >= 400 && error.status < 500) {
            errorMessage = 'There seems to be a problem with the information provided. Please check and try again.';
            if (error.status === 401) {
              errorMessage = 'You are not authorized to perform this action. Please log in and try again.';
            } else if (error.status === 404) {
              errorMessage = 'The requested resource was not found.';
            }
          } else if (error.status >= 500) {
            errorMessage = 'The server encountered an error. Please try again later.';
          } else {
            errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }

        this.snackBar.open(errorMessage, 'Dismiss', {
          duration: 10000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

        return throwError(error);
      })
    );
  }
}
