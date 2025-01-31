// import { NgIf } from '@angular/common';
// import { Component } from '@angular/core';
// import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { of } from 'rxjs';

// const storedUserData: { email: string | null | undefined, password: string | null | undefined }[] = [];

// function emailExistsValidator(control: AbstractControl) {
//   const email = control.value;
  
//   const isDuplicate = storedUserData.some(user => user.email === email);
  
//   return isDuplicate ? of({ emailNotUnique: true }) : of(null) 
// }



// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   templateUrl: './signup.component.html',
//   styleUrl: './signup.component.css',
//   imports: [ReactiveFormsModule,NgIf]
// })
// export class SignupComponent {
  
//   form = new FormGroup({
//     email: new FormControl('', {
//       validators: [Validators.email, Validators.required],
//       asyncValidators : [emailExistsValidator]
//     }),

//     passwords: new FormGroup({
//       password: new FormControl('', { validators: [Validators.required] }),
//       confirmPassword: new FormControl('', { validators: [Validators.required] })
//     }, { validators: passwordMatchValidator }),  

//     firstName: new FormControl('', { validators: [Validators.required] }),
//     lastName: new FormControl('', { validators: [Validators.required] }),

//     
//   });



//   onSubmit() {
//     if (this.form.invalid) {
//       return;
//     }
//     console.log(this.form);
//     const email = this.form.get('email')?.value;
//     const password = this.form.get('passwords.password')?.value;
    
//     storedUserData.push({ email, password });
//     console.log(storedUserData);
//     this.form.reset();
//   }

//   
//   }
// }

import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { of } from 'rxjs';

// Custom Async Validator to Check if the Email Already Exists
function emailExistsValidator(control: AbstractControl) {
  const email = control.value;
  const storedUserData = JSON.parse(localStorage.getItem('users') || '[]');
  const isDuplicate = storedUserData.some((user: { email: string }) => user.email === email);
  return isDuplicate ? of({ emailNotUnique: true }) : of(null);
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule,NgIf]
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailExistsValidator]
    }),

    passwords: new FormGroup({
      password: new FormControl('', { validators: [Validators.required] }),
      confirmPassword: new FormControl('', { validators: [Validators.required] })
    }, { validators: this.passwordMatchValidator }),

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

  // Custom Validator to Ensure Passwords Match
  passwordMatchValidator(controls: AbstractControl) {
    const password = controls.get('password')?.value;
    const confirmPassword = controls.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword
      ? null
      : { passwordsDoNotMatch: true };
  }

  // Handle Form Submission
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;
    const userData = {
      email: formData.email,
      password: formData.passwords?.password,
    };

    // Get existing users from localStorage and store new user
    const storedUserData = JSON.parse(localStorage.getItem('users') || '[]');
    storedUserData.push(userData);
    localStorage.setItem('users', JSON.stringify(storedUserData));

    console.log('User Data:', userData);
    this.form.reset(); // Reset the form
  }
  
  onReset() {
    this.form.reset({
      role: 'student',
      source: [false, false, false],
      agree: false
    });
  }
}