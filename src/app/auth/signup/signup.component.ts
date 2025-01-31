import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

function passwordMatchValidator(controls: AbstractControl) {
  const password = controls.get('password')?.value;
  const confirmPassword = controls.get('confirmPassword')?.value;

  if (password && confirmPassword && password === confirmPassword) {
    return of(null);
  }
  return of({ passwordsDoNotMatch: true }); 
}


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


    passwords : new FormGroup({
  
        password : new FormControl('', {
          validators: [Validators.required]
        }),
        
        confirmPassword : new FormControl('',{
          validators:[Validators.required ,passwordMatchValidator],
        }),

    }),
        firstName : new FormControl('',{
          validators:[Validators.required],
        }),
        lastName : new FormControl('',{
          validators:[Validators.required],
    }),
    
    address : new FormGroup({
   
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
  
  }),
    
  role : new FormControl<'student' |'teacher' | 'employee' | 'founder' |'other'> ('student',
    {
      validators : [Validators.required]
    }),
      
    source : new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),

    ]),
    
    agree : new FormControl(false,
      {
        validators : [Validators.required]

      }),
  });

  storedUserData: { email: string|null|undefined, password: string|null|undefined }[] = [];

  onSubmit(){
    
     
       const email = this.form.get('email')?.value;
      const password = this.form.get('passwords')?.get('password')?.value;
      this.storedUserData.push({ email:email,password: password });
      console.log(this.storedUserData);
      this.form.reset();
  }

  onReset(){
    this.form.reset();
  }
}
