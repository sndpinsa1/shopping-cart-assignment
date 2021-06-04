import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as formApp from "../../store";
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/actions/auth.action';
import { MessageService } from '../../core/services/message.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users:User[] = [];
  constructor(
    private router: Router,
    private store: Store<formApp.AppState>,
    private msgService: MessageService
  ) { }

  signup(user:User){
    if(sessionStorage.getItem('users')){
      let userString:string | null = sessionStorage.getItem('users');
      let users:User[] = JSON.parse(userString? userString : "[]");
      let alreadyExist = users.find(userElement => userElement.email ===  user.email);
      if(alreadyExist){
        this.msgService.show('User already exists!')
        return;
      }else{
        users.push(user);
        sessionStorage.setItem('users', JSON.stringify(users));
        this.msgService.show("SignUp Successfully");
        this.router.navigate(['/home']);
      }
    }else{
        sessionStorage.setItem('users', JSON.stringify([user]));
        this.msgService.show("SignUp Successfully");
        this.router.navigate(['/home']);
    }
  }

  login(user:User){
    if(sessionStorage.getItem('users')){
      let userString:string | null = sessionStorage.getItem('users');
      let users:User[] = JSON.parse(userString? userString : "[]");
      let alreadyExist = users.find(userElement => userElement.email ===  user.email);
      if(alreadyExist){
        if(alreadyExist.email === user.email && alreadyExist.password === user.password){
          this.store.dispatch(AuthActions.login({email:alreadyExist.email, password:alreadyExist.password, firstName:alreadyExist.firstName}))
          this.msgService.show("Logged In Successfully");
          this.router.navigate(['/home']);
        }else{
         this.msgService.show("Username or password is incorrect!");
        }
      }else{
        this.msgService.show("User not exist. Please Sigup First.")
      }
    }else{
      this.msgService.show("User not exist. Please Sigup First.")
    }
  }

}
