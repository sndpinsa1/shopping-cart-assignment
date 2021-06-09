import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../core/services/message.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { appState } from '../../shared/mocks/app-state.mock';
import { AppState } from '../../store/reducers/app.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { MatModule } from '../../shared/mat.module';
import { User } from '../models/user.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthService', () => {
  let service: AuthService;
  let router:Router;
  let messageService:MessageService;
  let store: MockStore;
  const initialState: AppState = appState;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([]), MatModule, BrowserAnimationsModule],
      providers:[
        provideMockStore({ initialState }),
        MessageService
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
    store = TestBed.inject(MockStore)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called signup method user already exist', () => {
    localStorage.setItem('users',JSON.stringify([{email:'abc@gmail.com', password:'12345678',firstName:'sandeep'}]))
    const spy1 = spyOn(messageService, 'error');
    const user:User = {email:'abc@gmail.com', password:'12345678',firstName:'sandeep'};
    service.signup(user)
    expect(spy1).toHaveBeenCalled();
  });

  it('should be called signup method no user', () => {
    localStorage.setItem("users","[]");
    const spy1 = spyOn(messageService, 'show');
    const spy2 = spyOn(router, 'navigate');
    const user:User = {email:'abc@gmail.com', password:'12345678',firstName:'sandeep'};
    service.signup(user);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should be called login method', () => {
    const spy1 = spyOn(messageService, 'show');
    const spy2 = spyOn(router, 'navigate');
    const spy3 = spyOn(store, 'dispatch');

    const user:User = {email:'abc@gmail.com', password:'12345678',firstName:'sandeep'};
    service.login(user)
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();

  });


  it('should be called login method and username password incorrent', () => {
    const spy1 = spyOn(messageService, 'error');
    const user:User = {email:'abc@gmail.com', password:'safasdf',firstName:'sandeep'};
    service.login(user)
    expect(spy1).toHaveBeenCalled();
  });

  it('should be called login method and username not signup', () => {
    const spy1 = spyOn(messageService, 'error');
    const user:User = {email:'abc@gmaiel.com', password:'safasdf',firstName:'sandeep'};
    service.login(user)
    expect(spy1).toHaveBeenCalled();
  });


});
