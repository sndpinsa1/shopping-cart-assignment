import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({providedIn:'root'})
export class MessageService {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(private _snackBar: MatSnackBar) { }

    show(message:string):void{
      this._snackBar.open(message, undefined, {
        duration : 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }

    error(message:string):void{ 
      this._snackBar.open(message, undefined, {
        duration : 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass:'error'
      })
    }
}
