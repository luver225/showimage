import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Service } from 'src/app/shared/service';
import { UserDto } from 'src/app/shared/dto';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  needVisibility: boolean;
  registerResult: string;
  isRegisterLoading: boolean;

  constructor(private fb: FormBuilder,
    private service: Service,
    private message: NzMessageService,) {
    this.form = fb.group({
      userName: [null,],
      password: [null,],
      confirmpassword: [null,],
    });
  }

  ngOnInit(): void {
  }

  register() {

    if(this.form.controls.userName.value == null
    ||this.form.controls.password.value == null
    ||this.form.controls.confirmpassword.value == null
    ||this.form.controls.userName.value == ""
    ||this.form.controls.password.value == ""
    ||this.form.controls.confirmpassword.value == "")
    {
      this.message.warning("请输入密码！");
      return;
    }

    if (this.form.controls.password.value != this.form.controls.confirmpassword.value) {
      this.needVisibility = true;
      this.registerResult = "两次密码不相同,请重新输入";
      return;
    }

    this.isRegisterLoading = true;
    this.needVisibility = true;
    this.registerResult = "注册中...";

    let register = new UserDto();
    register.UserName = this.form.controls.userName.value;
    register.PassWord = this.form.controls.password.value;

    this.service.Register(register).subscribe(
      (data: string) => {
        this.isRegisterLoading = false;
        this.needVisibility = true;
        this.registerResult = data;
      },
      (error: any) => {
        this.isRegisterLoading = false;
        this.message.error("网络发生异常 , 请重试！");
      }
    )
  }
}
