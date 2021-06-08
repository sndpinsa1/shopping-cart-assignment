import { NgModule } from '@angular/core';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from './mat.module';
import { RouterModule } from '@angular/router';

const ALL_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  IvyCarouselModule,
  MatModule,
  RouterModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...ALL_MODULES
  ],
  exports: [
    ...ALL_MODULES
  ],
})
export class SharedModule {}
