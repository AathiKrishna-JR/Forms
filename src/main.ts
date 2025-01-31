import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './app/auth/login/login.component';

bootstrapApplication(AppComponent,
    {
        providers : [provideRouter([
            {
                path : 'login',
                component : LoginComponent,
            }
        ])]
    }).catch((err) => console.error(err));