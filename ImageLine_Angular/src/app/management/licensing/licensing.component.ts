import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/shared/service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LicenseChangeDto, UserInfoDto } from 'src/app/shared/dto';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-licensing',
  templateUrl: './licensing.component.html',
  styleUrls: ['./licensing.component.css']
})
export class LicensingComponent implements OnInit {



  ngOnInit() {

    let id = parseInt(localStorage.getItem("UserId"));
    this.service.GetUserInfo(id).subscribe(
      (data:UserInfoDto)=>{
        if(data == null || data == undefined)
        {
          return;
        }
        if(data.License == null)
        {
          this.isLicense = false;
        }
        else
        {
          this.isLicense = true;
          this.licenseValue = data.License;
        }
      },
      (error: any) => {
        this.message.error("网络发生异常 , 请重试！");
      }
    )
  }

  form: FormGroup;
  needVisibility: boolean;
  loginResult:string;
  isLicense:boolean;
  licenseValue:string;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private service: Service,
    private message: NzMessageService,) {
    this.form = fb.group({
      license: [null,],
      confirmlicense: [null,],
    });
  }

  login() {

    if(this.form.controls.license.value != this.form.controls.confirmlicense.value)
    {
      this.needVisibility = true;
      this.loginResult = "两次许可码不相同,请重新输入";
      return;
    }


    let licenseChangeDto = new LicenseChangeDto();
    licenseChangeDto.UserID = parseInt(localStorage.getItem("UserId"));
    licenseChangeDto.License = this.form.controls.license.value;

    this.service.LicenseChange(licenseChangeDto).subscribe(
      (data) => {
        if (data) {
      
          this.needVisibility = true;
          this.loginResult = "授权成功";
          this.licenseValue = this.form.controls.license.value;

          
        }
        else {
          this.needVisibility = true;
          this.loginResult = "授权失败";
        }
      },
      (error: any) => {
        this.message.error("网络发生异常 , 请重试！");
      }
    )
  }


}
