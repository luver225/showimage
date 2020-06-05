import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { Service } from 'src/app/shared/service';
import { UserDto, LoginResultDto } from 'src/app/shared/dto';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-logincheck',
  templateUrl: './logincheck.component.html',
  styleUrls: ['./logincheck.component.css']
})
export class LogincheckComponent implements OnInit {

  form: FormGroup;
  needVisibility: boolean;
  loginResult: string;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private service: Service,
    private message: NzMessageService,) {

    this.form = fb.group({
      userName: [null,],
      password: [null,],
    });

  }

  ngOnInit(): void {
  }

    login() {

    if(this.form.controls.userName.value == null 
    || this.form.controls.password.value == null
    || this.form.controls.userName.value == ""
    || this.form.controls.password.value == "")
    {
      this.message.warning("请输入账号密码！");
      return;
    }

    this.needVisibility = true;
    this.loginResult = "登陆中...";

    let userLoginDto = new UserDto();
    userLoginDto.UserName = this.form.controls.userName.value;
    userLoginDto.PassWord = this.form.controls.password.value;

    this.service.UserLogin(userLoginDto).subscribe(
      (data: LoginResultDto) => {
        if (data.IsSuccess) {
          localStorage.setItem("Token", data.Token);
          localStorage.setItem("IsLoginSuccess", "true");
          localStorage.setItem("UserId", data.UserID.toString());
          localStorage.setItem("IsUser", "true");
          this.needVisibility = false;
          this.route.navigate(['/showimage']);
        }
        else {
          this.needVisibility = true;
          this.loginResult = data.Reason;
        }
      },
      (error: any) => {
        this.message.error("网络发生异常 , 请重试！");
      }
    )
  }
}
