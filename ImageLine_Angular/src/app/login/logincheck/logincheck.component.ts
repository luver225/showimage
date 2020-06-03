import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { Service } from 'src/app/shared/service';
import { UserChangeDto, UserDto, LoginResultDto } from 'src/app/shared/dto';

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


    let userLoginDto = new UserDto();
    userLoginDto.UserName = this.form.controls.userName.value;
    userLoginDto.PassWord = this.form.controls.password.value;

    this.service.UserLogin(userLoginDto).subscribe(
      (data: LoginResultDto) => {
        if (data.IsSuccess) {
          //set token
          this.service.token = data.Token;;
          this.service.httpOptions.headers = this.service.httpOptions.headers.set('Authorization',"Bearer "+data.Token);
          this.service.isLoginSuccess = true;
          localStorage.setItem("UserId",data.UserID.toString());
          this.needVisibility = false;
          this.route.navigate(['/showimage']);
        }
        else {
          this.needVisibility = true;
          this.loginResult = data.Reason;
        }
      }
    )
  }







}
