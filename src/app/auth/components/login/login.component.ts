import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup;
  constructor(
    private authService: AuthService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email:['', [Validators.required, Validators.email]],
        password:['',[Validators.required]]
      }
    )
  }

  login(formValue:any){
    this.authService.login(formValue);
  }

}
