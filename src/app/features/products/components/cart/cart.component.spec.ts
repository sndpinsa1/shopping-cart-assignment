import { appState } from './../../../../shared/mocks/app-state.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { AppState } from '../../../../store/reducers/app.reducer';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from '../../../../core/services/message.service';
import { Injector } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '../../../../auth/components/login/login.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store: MockStore;
  let router: Router;
  let dialog: MatDialog;
  let matRef: MatDialogRef<any>;
  const initialState: AppState = appState;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [
        // StoreModule.forRoot(appReducer),
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'auth/login', component: LoginComponent },
        ]),
        BrowserAnimationsModule,
      ],
      providers: [
        MessageService,
        Injector,
        {
          provide: MatDialogRef,
          useValue: { close: () => {} },
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    matRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action on remove click', () => {
    const spy = spyOn(store, 'dispatch');
    component.remove('5b6c6a7f01a7c38429530883');
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch action on add click', () => {
    const spy = spyOn(store, 'dispatch');
    component.add('5b6c6a7f01a7c38429530883');
    expect(spy).toHaveBeenCalled();
  });

  it('should clicked checkout method when user not loggedin', () => {
    const spy = spyOn(store, 'dispatch');
    const spy2 = spyOn(router, 'navigate');
    component.checkout();
    expect(spy).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
  });

  it('should clicked checkout method when user loggedin', () => {
    component.loggedInUser = { email: 'abc@gmail.com', password: '12321312' };
    const spy = spyOn(store, 'dispatch');
    const spy2 = spyOn(router, 'navigate');
    component.checkout();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should clicked checkout method when user loggedin when not desktop', () => {
    component.loggedInUser = { email: 'abc@gmail.com', password: '12321312' };
    component.isDesktop = false;
    const spy = spyOn(store, 'dispatch');
    const spy2 = spyOn(router, 'navigate');
    component.checkout();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should called close method', () => {
    component.checkout();
    const spy1 = spyOn(component.matDialogRef, 'close');
    component.cancel();
    expect(spy1).toHaveBeenCalled();
  });

  it('should called ok method when ok clicked', () => {
    component.checkout();
    const spy1 = spyOn(component.matDialogRef, 'close');
    component.ok();
    expect(spy1).toHaveBeenCalled();
  });

  it('should called ok method when ok clicked on isDesktop false', () => {
    component.isDesktop = false;
    component.checkout();
    const spy1 = spyOn(component.matDialogRef, 'close');
    component.ok();
    expect(spy1).toHaveBeenCalled();
  });
});
