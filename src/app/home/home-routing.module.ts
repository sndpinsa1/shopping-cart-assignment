import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const homeAppRoutes:Routes = [
  {
    path:'',
    component:HomeComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(homeAppRoutes)
  ],
  exports:[RouterModule]
})
export class HomeRoutingModule { }
