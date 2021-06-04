import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm:NgForm;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.loginForm)
  }

  login(formValue:any){
    this.authService.login(formValue);
  }

}
