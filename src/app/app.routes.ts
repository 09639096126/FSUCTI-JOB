import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
   {
    path:'dashboard',loadComponent:() =>
        import('./components/dashboard/dashboard.component').then((com) => com.DashboardComponent)
   },
   {
    path:'signup',loadComponent:() =>
        import('./components/signup/signup.component').then((com) => com.SignupComponent)
   },
   {
    path:'',loadComponent:() =>
        import('./components/signup/signup.component').then((com) => com.SignupComponent)
   },
   {
    path:'**',loadComponent:() =>
        import('./components/signup/signup.component').then((com) => com.SignupComponent)
   },
];
