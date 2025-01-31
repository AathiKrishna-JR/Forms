import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

const storedUserData: { email: string | null | undefined, password: string | null | undefined }[] = [];

function emailExistsValidator(control: AbstractControl) {
  const email = control.value;
  
  const isDuplicate = storedUserData.some(user => user.email === email);
  
  return isDuplicate ? of({ emailNotUnique: true }) : of(null) 
}


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
  imports: [ReactiveFormsModule,NgIf]
})
export class SignupComponent {
  
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators : [emailExistsValidator]
    }),

    passwords: new FormGroup({
      password: new FormControl('', { validators: [Validators.required] }),
      confirmPassword: new FormControl('', { validators: [Validators.required] })
    }, { validators: passwordMatchValidator }),  

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



  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(storedUserData);
    const email = this.form.get('email')?.value;
    const password = this.form.get('passwords.password')?.value;
    
    storedUserData.push({ email, password });
    console.log(storedUserData);
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
