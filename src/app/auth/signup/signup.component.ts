import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports:[ReactiveFormsModule]
})
export class SignupComponent {
  form = new FormGroup({
    email : new FormControl('',{
      validators: [Validators.email,Validators.required]
    }),
    password : new FormControl('', {
        validators: [Validators.minLength(6),Validators.required]
    }),
    confirmPassword : new FormControl('',{
      validators:[Validators.minLength(6),Validators.required],
    }),
    firstName : new FormControl('',{
      validators:[Validators.minLength(6),Validators.required],
    }),
    lastName : new FormControl('',{
      validators:[Validators.minLength(6),Validators.required],
    }),
    street : new FormControl('',{
      validators:[Validators.minLength(6),Validators.required],
    }),
    postalCode : new FormControl('',{
      validators:[Validators.minLength(6),Validators.required],
    }),
   
  });
  onReset(){
    this.form.reset();
  }
}
