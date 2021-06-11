import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

const ALL_MAT_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatIconModule
]

@NgModule({
  declarations: [],
  imports: [
    ...ALL_MAT_MODULES
  ],
  exports:[
    ...ALL_MAT_MODULES
  ]
})
export class MatModule { }
