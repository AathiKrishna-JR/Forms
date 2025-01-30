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
// }

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports : [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email : new FormControl('',{
      validators:[ Validators.email,Validators.required],
    }),
    password: new FormControl('',{
      validators : [Validators.required,Validators.minLength(6)],
    })
  });
  get emailIsInvalid(){
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email
  }
  get passwordIsInvalid(){
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.value.password
  }
  onSubmit(){
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
      console.log();
      
  }
}