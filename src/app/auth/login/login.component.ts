import { Component, DestroyRef, afterNextRender, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

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
      const subscription = this.form()?.valueChanges?.subscribe({
        next : (value) => console.log(value)
        
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

