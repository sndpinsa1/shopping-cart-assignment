import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as fromApp from '../../../store/reducers/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService],
      imports: [
        SharedModule,
        CoreModule,
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot(fromApp.appReducer),
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should form valid after corrent data', () => {
    component.loginForm.setValue({
      email: 'abc@gmail.com',
      password: '123456789',
    });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should login button works properly', () => {
    component.loginForm.setValue({
      email: 'abc@gmail.com',
      password: '123456789',
    });
    const loginEl: HTMLElement = fixture.nativeElement;
    const loginBtn: any = loginEl.querySelector('button');
    fixture.detectChanges();
    loginBtn.click();
    expect(component.loginForm.valid).toBeFalsy();
  });
});
