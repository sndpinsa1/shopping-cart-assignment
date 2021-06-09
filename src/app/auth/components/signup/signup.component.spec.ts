import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from '../../services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as fromApp from '../../../store/reducers/app.reducer';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      providers:[AuthService],
      imports: [
        SharedModule, 
        CoreModule, 
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot(fromApp.appReducer),
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Sigup form should be invalid when form empty', ()=>{
    expect(component.signUpForm.valid).toBeFalsy();
  })

  it('Sigup form should be valid after filling valid input', ()=>{
    component.signUpForm.setValue({
      firstName:'Sandeep',
      lastName:"saini",
      email:"abc@gmail.com",
      password:'12345678',
      cnfPassword:'12345678'
    })
    expect(component.signUpForm.valid).toBeTruthy();
  })

  it('Sigup form should be submit on sigup click', ()=>{
    component.signUpForm.setValue({
      firstName:'Sandeep',
      lastName:"saini",
      email:"abc@gmail.com",
      password:'12345678',
      cnfPassword:'12345678'
    });

    const signEl:HTMLElement = fixture.nativeElement;
    const signBtn:any = signEl.querySelector('button');
    fixture.detectChanges();
    signBtn.click();
    expect(component.signUpForm.valid).toBeFalsy();
  })

  it('Sigup form should be submit on sigup password not match', ()=>{
    component.signUpForm.setValue({
      firstName:'Sandeep',
      lastName:"saini",
      email:"abc@gmail.com",
      password:'12345678',
      cnfPassword:'52341234'
    });
    const spy = spyOn(authService, 'signup');
    const signEl:HTMLElement = fixture.nativeElement;
    const signBtn:any = signEl.querySelector('button');
    fixture.detectChanges();
    signBtn.click();
    expect(spy).not.toHaveBeenCalled();
  })



});
