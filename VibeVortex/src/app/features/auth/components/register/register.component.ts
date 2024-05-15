import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { UserInfo } from '../../models/user.info';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hidePassword: boolean = true;
  isRegistering: boolean = false;
  isRegistrationFaild: boolean = false;

  registerForm!: FormGroup;
  fileName: string = '';
  maxDate = new Date();
  minDate = new Date();

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 13);
    this.minDate.setFullYear(this.minDate.getFullYear() - 100);
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPasswordValidator()]],
      birthdate: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      profilePhoto: [null],
    }, { validators: this.passwordMatchValidator });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    const maxSize = 1 * 1024 * 1024; // 5 MB

    if (file && this.isImageFile(file) && file.size <= maxSize) {
      this.fileName = file.name;
      this.registerForm.patchValue({ profilePhoto: file });
      this.registerForm.get('profilePhoto')?.setErrors(null);
      this.convertToBase64(file);
    } else {
      if (file.size > maxSize) {
        this.registerForm.get('profilePhoto')?.setErrors({ 'maxSizeExceeded': true });
      } else {
        this.registerForm.get('profilePhoto')?.setErrors({ 'invalidFileType': true });
      }
      this.fileName = '';
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.registerForm.patchValue({ profilePhoto: reader.result });
    };
    reader.onerror = (error) => {
      console.log('Error converting image to Base64:', error);
      this.registerForm.get('profilePhoto')?.setErrors({ 'conversionError': true });
    };
  }

  isImageFile(file: File): boolean {
    return file.type.match(/image\/*/) != null;
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // Validator logic remains the same
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { 'passwordMismatch': true };
  };

  strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const rules = [
        { test: (val: string) => /[A-Z]/.test(val), message: 'Password must contain at least one uppercase letter.' },
        { test: (val: string) => /[a-z]/.test(val), message: 'Password must contain at least one lowercase letter.' },
        { test: (val: string) => /[0-9]/.test(val), message: 'Password must contain at least one number.' },
        { test: (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val), message: 'Password must contain at least one special character.' },
        { test: (val: string) => val.length >= 8, message: 'Password must be at least 8 characters long.' },
      ];

      const failingRule = rules.find(rule => !rule.test(value));
      if (failingRule) {
        return { 'passwordStrength': failingRule.message };
      }

      return null;
    };
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const payload: UserInfo = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        birthdate: this.registerForm.value.birthdate,
        profilePhoto: this.registerForm.value.profilePhoto,
      };

      this.isRegistering = true;
      this.authService.register(payload).subscribe({
        next: (res) => {
          this.isRegistering = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.isRegistering = false;
          this.isRegistrationFaild = true;
        }
      });
    }
  }
}
