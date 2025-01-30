import { Component, DestroyRef, afterNextRender, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {debounceTime,pipe} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports : [FormsModule]
})
export class LoginComponent {
  
  private form = viewChild<NgForm>('form');
  private destroyRef = inject(DestroyRef)

  constructor(){
    afterNextRender(() => {
      const subscription = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
        next : (value) => window.localStorage.setItem('loin',JSON.stringify({email:value.email}))
        
      });
    });
  }
  onsubmit(formData:NgForm)
  {
      if(formData.form.invalid){
            return;
      }
      const enteredEmail = formData.form.value.email;
      const enteredPassword =formData.form.value.password;
      console.log(formData.form,enteredEmail,enteredPassword);
      formData.form.reset();
    
    }
}

