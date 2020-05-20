import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogincheckComponent } from './login/logincheck/logincheck.component';
import { RegisterComponent } from './login/register/register.component';
import { ShowimageComponent } from './showimage/showimage.component';
import { ManagementComponent } from './management/management.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { VistorComponent } from './login/vistor/vistor.component';


const routes: Routes = [
  { path: '', redirectTo: '/login/logincheck', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: 'logincheck', component: LogincheckComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'vistor', component: VistorComponent },
    ]
  },
  { path: 'showimage', component: ShowimageComponent },
  { path: 'management', component: ManagementComponent },
  
  { path: '**', component: ErrorpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
