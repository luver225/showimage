import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Service } from 'src/app/shared/service';
import { Router } from '@angular/router';
import { UserDto, UserChangeDto, UserInfoDto } from 'src/app/shared/dto';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  form: FormGroup;
  needVisibility: boolean;
  loginResult:string;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private service: Service,
    private message: NzMessageService,) {

      if(localStorage.getItem("IsLoginSuccess") != "true")
      {
        this.route.navigate(['/loginfail']);
      }

      
    this.form = fb.group({
      userName: [null,],
      password: [null,],
      confirmpassword: [null,],
    });
  }

  ngOnInit(): void {
    let id  = parseInt(localStorage.getItem("UserId"));
    this.service.GetUserInfo(id).subscribe(
      (data:UserInfoDto) => {
        if(data == null || data == undefined)
        {
          return;
        }
        this.form.controls.userName.setValue(data.Name);
      } 
    )
  }

  login() {

    if(this.form.controls.password.value != this.form.controls.confirmpassword.value)
    {
      this.needVisibility = true;
      this.loginResult = "两次密码不相同,请重新输入";
      return;
    }
  
    //todo server
    let userDto = new UserChangeDto();
    userDto.UserID = parseInt(localStorage.getItem("UserId"));
    userDto.PassWord = this.form.controls.password.value;

    this.service.UserChange(userDto).subscribe(
      (data) => {
        if (data) {
          this.needVisibility = true;
          this.loginResult = "修改成功";

        }
        else {
          this.needVisibility = true;
          this.loginResult = "修改失败";
        }
      },
      (error: any) => {
        this.message.error("网络发生异常 , 请重试！");
      }
    )
  }


}
