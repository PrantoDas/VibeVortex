import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LogingCredential } from '../../models/login.credential';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword: boolean = true;
  isLoginFailed: boolean = false;
  isLoggingIn: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoginFailed = false;
      this.isLoggingIn = true;
      this.authService.login(this.loginForm.value as LogingCredential).subscribe({
        next: (res) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.isLoggingIn = false;
          this.isLoginFailed = true;
        }
      });
    }
  }
}
