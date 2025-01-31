import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './app/auth/login/login.component';
import { SignupComponent } from './app/auth/signup/signup.component';

bootstrapApplication(AppComponent,
    {
        providers : [provideRouter([
            {
                path : 'login',
                component : LoginComponent,
            },
            {
                path:'signup',
                component:SignupComponent,
            }
        ])]
    }).catch((err) => console.error(err));