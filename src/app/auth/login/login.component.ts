// import { Component, DestroyRef, afterNextRender, inject, viewChild } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import {debounceTime,pipe} from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
//   imports : [FormsModule]
// })
// export class LoginComponent {
  
//   private form = viewChild<NgForm>('form');
//   private destroyRef = inject(DestroyRef)

//   constructor(){
//     afterNextRender(() => {
//       const saved = window.localStorage.getItem('login');  
//       if(saved){
//         const loadedData = JSON.parse(saved);
//         const savedEmail = loadedData.email;
//         setTimeout(()=> {
//         this.form()?.controls['email'].setValue(savedEmail);},1);
//       }
//       JSON.parse
//       const subscription = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
//         next : (value) => window.localStorage.setItem('login',JSON.stringify({email:value.email}))
        
//       });
//     });
//   }
//   onsubmit(formData:NgForm)
//   {
//       if(formData.form.invalid){
//             return;
//       }
//       const enteredEmail = formData.form.value.email;
//       const enteredPassword =formData.form.value.password;
//       console.log(formData.form,enteredEmail,enteredPassword);
//       formData.form.reset();
    
//     }
// // }





import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  loginError = false;

  ngOnInit() {
    const savedForm = window.localStorage.getItem('save-form');
    if (savedForm) {
      const loadedData = JSON.parse(savedForm);
      this.form.patchValue({
        email: loadedData.email,
      });
    }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem(
          'save-form',
          JSON.stringify({ email: value.email })
        );
      },
    });
  }

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    // Get the stored user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUserData.find(
      (user: { email: string; password: string }) =>
        user.email === enteredEmail && user.password === enteredPassword
    );

    if (user) {
      console.log('Login successful');
      this.loginError = false;
      // Redirect user or perform other actions on successful login
    } else {
      console.log('Invalid credentials');
      this.loginError = true; // Display error if credentials are incorrect
    }
  }

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }
}
