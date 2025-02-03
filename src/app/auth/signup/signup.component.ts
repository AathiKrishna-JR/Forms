import { NgIf } from '@angular/common';
import { Component, Signal, computed, effect, signal } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, NgIf, RouterLink]
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }, this.emailExistsValidator()), // ✅ Correct async validator usage

    passwords: new FormGroup(
      {
        password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
        confirmPassword: new FormControl('', { validators: [Validators.required], nonNullable: true })
      },
      { validators: this.passwordMatchValidator }
    ),

    firstName: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    lastName: new FormControl('', { validators: [Validators.required], nonNullable: true }),

    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      number: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      postalCode: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      city: new FormControl('', { validators: [Validators.required], nonNullable: true })
    }),

    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: [Validators.required],
      nonNullable: true
    }),

    source: new FormArray([
      new FormControl(false, { nonNullable: true }),
      new FormControl(false, { nonNullable: true }),
      new FormControl(false, { nonNullable: true })
    ]),

    agree: new FormControl(false, { validators: [Validators.requiredTrue], nonNullable: true })
  });


  emailError: Signal<boolean> = computed(() => !!this.form.get('email')?.hasError('emailNotUnique'));
  passwordMismatch: Signal<boolean> = computed(() => !!this.form.get('passwords')?.hasError('passwordsDoNotMatch'));
  atLeastOneChecked: Signal<boolean> = computed(() => this.form.get('source')?.value.some((val: boolean) => val) === false);

  constructor(private router: Router) {

    effect(() => {
      if (this.atLeastOneChecked()) {
        this.form.get('source')?.setErrors({ required: true });
      } else {
        this.form.get('source')?.setErrors(null);
      }
    });
  }

  passwordMatchValidator(controls: AbstractControl): ValidationErrors | null {
    const password = controls.get('password')?.value;
    const confirmPassword = controls.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword
      ? null
      : { passwordsDoNotMatch: true };
  }

 
  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return new Promise<ValidationErrors | null>((resolve) => {
        const email = control.value;
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const isDuplicate = storedUsers.some((user: { email: string }) => user.email === email);
        resolve(isDuplicate ? { emailNotUnique: true } : null);
      });
    };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Mark all fields to show validation errors
      return;
    }

    const formData = this.form.value;
    const newUser = {
      email: formData.email,
      password: formData.passwords?.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      role: formData.role,
      source: formData.source,
    };

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    console.log('User Registered:', newUser);
    this.form.reset();

    this.router.navigate(['/login']); // Navigate to login page after successful signup
  }

  onReset() {
    this.form.reset({
      role: 'student',
      source: [false, false, false],
      agree: false
    });
  }
}
