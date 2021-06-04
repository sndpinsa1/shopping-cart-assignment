import { HomeComponent } from './components/home-comp/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared/shared.module';

const homeAppRoutes:Routes = [
  {
    path:'',
    component:HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(homeAppRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class HomeModule { }
