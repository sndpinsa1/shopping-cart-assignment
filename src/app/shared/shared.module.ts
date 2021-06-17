import { NgModule } from '@angular/core';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from './mat.module';
import { RouterModule } from '@angular/router';
import { ShortenPipe } from './pipes/shorten.pipe';

const ALL_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  IvyCarouselModule,
  MatModule,
  RouterModule,
];

const ALL_SHARED_PIPE = [ShortenPipe];

@NgModule({
  declarations: [...ALL_SHARED_PIPE],
  imports: [...ALL_MODULES],
  exports: [...ALL_MODULES, ...ALL_SHARED_PIPE],
})
export class SharedModule {}
