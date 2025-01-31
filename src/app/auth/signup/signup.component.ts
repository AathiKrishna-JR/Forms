import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function passwordMatchValidator(controls: AbstractControl) {
  const password = controls.get('password')?.value;
  const confirmPassword = controls.get('confirmPassword')?.value;

  return password && confirmPassword && password === confirmPassword
    ? null
    : { passwordsDoNotMatch: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule]
})
export class SignupComponent {
  
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),

    passwords: new FormGroup({
      password: new FormControl('', { validators: [Validators.required] }),
      confirmPassword: new FormControl('', { validators: [Validators.required] })
    }, { validators: passwordMatchValidator }),  // Apply validator to the FormGroup

    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),

    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] })
    }),

    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: [Validators.required]
    }),

    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]),

    agree: new FormControl(false, { validators: [Validators.requiredTrue] })
  });

  storedUserData: { email: string | null | undefined, password: string | null | undefined }[] = [];

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const email = this.form.get('email')?.value;
    const password = this.form.get('passwords.password')?.value;
    
    this.storedUserData.push({ email, password });
    console.log(this.storedUserData);
    this.form.reset();
  }

  onReset() {
    this.form.reset({
      role: 'student',
      source: [false, false, false],
      agree: false
    });
  }
}
