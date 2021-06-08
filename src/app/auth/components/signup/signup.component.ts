import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../core/services/message.service';
import { AppGlbMessages } from '../../../shared/constants/app-glb-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private msgService: MessageService
    ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cnfPassword: ['', [Validators.required]],
    });
  }

  signup(): void {
    if (this.signUpForm.value.password !== this.signUpForm.value.cnfPassword) {
      this.msgService.error(AppGlbMessages.CNF_PASSWORD_NOT_MATCH)
      return;
    }
    let user: User = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      firstName: this.signUpForm.value.firstName,
    };
    this.authService.signup(user);
    this.signUpForm.reset();
  }
}
