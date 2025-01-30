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

import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function isContainQuestionMark(control : AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return {notContainQuestionMark: true};
}
function emailIsUnique(controls:AbstractControl){
  if(controls.value !== 'test@example.com'){
    return of(null);
  }
  return of({notUnique: true});
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports : [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef)
  form = new FormGroup({
    email : new FormControl('',{
      validators:[ Validators.email,Validators.required],
      asyncValidators : [emailIsUnique],
    }),
    password: new FormControl('',{
      validators : [Validators.required,Validators.minLength(6),isContainQuestionMark],
    })
  });
  ngOnInit(){
    const subscription =this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next : value =>{
        window.localStorage.setItem(
          'save-form',
          JSON.stringify({ email : value.email }));
      },

    });
    this.destroyRef.onDestroy(()=>subscription.unsubscribe());
  }
  get emailIsInvalid(){
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email
  }
  get passwordIsInvalid(){
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.value.password
  }
  onSubmit(){
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
      console.log(enteredEmail,enteredPassword);
      
  }
}