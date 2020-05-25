import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { Service } from 'src/app/shared/service';
import { UserLoginDto } from 'src/app/shared/dto';

@Component({
  selector: 'app-logincheck',
  templateUrl: './logincheck.component.html',
  styleUrls: ['./logincheck.component.css']
})
export class LogincheckComponent implements OnInit {

  form: FormGroup;
  needVisibility: boolean;
  loginResult:string;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private service: Service) {
    this.form = fb.group({
      userName: [null,],
      password: [null,],
    });
  }

  ngOnInit(): void {
  }

  login() {

    this.needVisibility = true;
    this.loginResult = "登陆中...";


    let userLoginDto = new UserLoginDto();
    userLoginDto.UserName = this.form.controls.userName.value;
    userLoginDto.PassWord = this.form.controls.password.value;

    this.service.UserLogin(userLoginDto).subscribe(
      (data: string) => {
        if (data.slice(0,4) == "登录成功") {
          
          //set token
          this.service.token = data.slice(4);;
          this.service.httpOptions.headers = this.service.httpOptions.headers.set('Authorization',"Bearer "+this.service.token);
          this.service.isLoginSuccess = true;


          this.needVisibility = false;
          this.route.navigate(['/showimage']);
        }
        else {
          this.needVisibility = true;
          this.loginResult = data;
        }
      }
    )
  }







}
