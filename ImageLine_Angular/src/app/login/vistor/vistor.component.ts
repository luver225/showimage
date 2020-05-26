import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisitorLoginDto } from 'src/app/shared/dto';
import { Service } from 'src/app/shared/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vistor',
  templateUrl: './vistor.component.html',
  styleUrls: ['./vistor.component.css']
})
export class VistorComponent implements OnInit {

  form: FormGroup;
  needVisibility: boolean;
  loginResult:string;

  constructor(private fb: FormBuilder,
    private service: Service,
    private route: Router,) {
    this.form = fb.group({
      userName: [null,],
      password: [null,],
    });

  }

  ngOnInit(): void {
  }

  
  vistor()
  { 

    this.needVisibility = true;
    this.loginResult = "登录中...";

      let visitorLoginDto = new VisitorLoginDto();
      visitorLoginDto.UserName = this.form.controls.userName.value;
      visitorLoginDto.License = this.form.controls.password.value;
  
      this.service.VisitorLogin(visitorLoginDto).subscribe(
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
