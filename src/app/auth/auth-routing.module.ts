import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';


const authRoute:Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
   path:'',
   redirectTo:'login',
   pathMatch:'full' 
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(authRoute)
  ],
  exports:[
    RouterModule
  ]
    
})
export class AuthRoutingModule { }
