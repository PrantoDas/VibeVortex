import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { LogingCredential } from '../models/login.credential';
import { UserInfo } from '../models/user.info';
import { AuthService as CoreAuthService } from '../../../core/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3002/auth';

  constructor(private http: HttpClient, private coreAuthService: CoreAuthService) { }

  login(credential: LogingCredential): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credential).pipe(
      delay(500),
      tap((response: any) => {
        localStorage.setItem('authToken', response.token);
        this.coreAuthService.initAuthState();
      })
    );
  }

  register(credential: UserInfo): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, credential).pipe(delay(500));
  }
}
