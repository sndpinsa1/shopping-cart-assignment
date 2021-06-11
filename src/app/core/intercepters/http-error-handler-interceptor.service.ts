import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor  {

  constructor(
    private msgService: MessageService
  ){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
        let errorMessage = '';
        if(error.error instanceof ErrorEvent){
          errorMessage = `Error: ${error.error.message}`
        }else{
          errorMessage = `Error: ${error.status}, Message: ${error.message}`
        }
        this.msgService.error(errorMessage);
        return throwError(errorMessage);
      })
    )
  }

}
