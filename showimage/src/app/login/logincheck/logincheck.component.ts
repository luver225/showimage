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
    let userLoginDto = new UserLoginDto();
    userLoginDto.UserName = this.form.controls.userName.value;
    userLoginDto.PassWord = this.form.controls.password.value;

    this.service.UserLogin(userLoginDto).subscribe(
      (data: string) => {
        if (data == "登录成功") {
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
