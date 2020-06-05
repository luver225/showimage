import { Component, OnInit } from '@angular/core';
import { Service } from '../shared/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(public service: Service,
    public route: Router) {

    if (localStorage.getItem("IsLoginSuccess") != "true") {
      this.route.navigate(['/loginfail']);
    }
  }

  managementList = [
    { name: "<<返回首页", path: "/showimage" },
    { name: "上传照片", path: "/management/uploadphotos" },
    { name: "主题管理", path: "/management/thememanager" },
    { name: "相册管理", path: "/management/photomanagement" },
    { name: "修改密码", path: "/management/changepassword" },
    { name: "授权许可", path: "/management/licensing" },
  ]

  ngOnInit() {
  }

}
