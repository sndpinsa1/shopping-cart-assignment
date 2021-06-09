import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as formApp from '../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/actions/auth.action';
import { MessageService } from '../../core/services/message.service';
import { AppGlbMessages } from '../../shared/constants/app-glb-messages';
@Injectable({providedIn:'root'})
export class AuthService {
  users: User[] = [];
  constructor(
    private router: Router,
    private store: Store<formApp.AppState>,
    private msgService: MessageService
  ) {}

  signup(user: User) {
    const users: User[] = this.getUsersFormStorage();
    const alreadyExist = users.find(
      (userElement) => userElement.email === user.email
    );
    if (alreadyExist) {
      this.msgService.error(AppGlbMessages.USER_EXIST);
    } else {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      this.msgService.show(AppGlbMessages.SIGNUP_SUCCESS);
      this.router.navigate(['/home']);
    }
  }

  login(user: User) {
    const users: User[] = this.getUsersFormStorage();
    const alreadyExist = users.find(
      (userElement) => userElement.email === user.email
    );
    if (alreadyExist) {
      if (
        alreadyExist.email === user.email &&
        alreadyExist.password === user.password
      ) {
        this.store.dispatch(
          AuthActions.login({
            user: {
              email: alreadyExist.email,
              password: alreadyExist.password,
              firstName: alreadyExist.firstName,
            },
          })
        );
        this.msgService.show(AppGlbMessages.LOGIN_SUCCESS);
        this.router.navigate(['/home']);
      } else {
        this.msgService.error(AppGlbMessages.INCORRECT_PWSD_EMIAL);
      }
    } else {
      this.msgService.error(AppGlbMessages.USER_NOT_FOUND);
    }
  }

  private getUsersFormStorage(): Array<User> {
    const usersString = localStorage.getItem('users');
    const users: User[] = JSON.parse(usersString || '[]');
    return users;
  }
}
