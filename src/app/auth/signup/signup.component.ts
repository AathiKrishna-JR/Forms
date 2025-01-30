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
        validators: [Validators.required]
    }),
    confirmPassword : new FormControl('',{
      validators:[Validators.required],
    }),
    firstName : new FormControl('',{
      validators:[Validators.required],
    }),
    lastName : new FormControl('',{
      validators:[Validators.required],
    }),
    street : new FormControl('',{
      validators:[Validators.required],
    }),
    number : new FormControl('',{
      validators:[Validators.required],
    }),
    postalCode : new FormControl('',{
      validators:[Validators.required],
    }),
    city : new FormControl('',{
      validators:[Validators.required],
    }),
    role : new FormControl<'student' |'teacher' | 'employee' | 'founder' |'other'> ('student',
    {
      validators : [Validators.required]
    }),
      agree : new FormControl(false,
      {
        validators : [Validators.required]

      }),
  });
  onReset(){
    this.form.reset();
  }
}
