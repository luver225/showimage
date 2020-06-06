import { Component, OnInit } from '@angular/core';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { Service } from 'src/app/shared/service';
import { ThemeDto } from 'src/app/shared/dto';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';


@Component({
  selector: 'app-uploadphotos',
  templateUrl: './uploadphotos.component.html',
  styleUrls: ['./uploadphotos.component.css']
})
export class UploadphotosComponent implements OnInit {

  uploadvis:boolean;
  successvis:boolean;
  failvis:boolean;
  ImageTime: Date;
  ImageOverview: string;
  ThemeName: string;
  ImageDescription: string;
  needimgVisibility: boolean;
  imagePre: string;
  selectFile: File;
  themeList = [];
  selectedTheme:any;
  isUploadLoading:boolean;
  uploadFile:Blob;


  constructor(
    private service: Service,
    private route: Router,
    private i18n: NzI18nService,
    private message: NzMessageService
  ) {
    this.i18n.setLocale(zh_CN);
  }


  ngOnInit() {

    this.uploadvis = true;
    this.successvis = false;
    this.failvis = false;
    this.getAllTheme();

  }

  FileSelected(event) {
    this.selectFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imagePre = event.target.result;
    }
    reader.readAsDataURL(this.selectFile);
    this.needimgVisibility = true;
  }




  upload() {
    if (this.selectFile == null) {
      this.message.warning("请选择一张图片！")
      return;
    }

    if (this.selectedTheme == null) {
      this.message.warning("请选择一个主题！")
      return;
    }

    if (this.ImageTime == null) {
      this.message.warning("请选择时间！")
      return;
    }

    this.isUploadLoading = true;
    const formdata = new FormData();

    formdata.append("file", this.selectFile, this.selectFile.name)
    formdata.append("imageyear", this.ImageTime.getFullYear().toString());
    formdata.append("imageMonth", this.ImageTime.getMonth().toString());
    formdata.append("imageOverview", this.ImageOverview)
    formdata.append("themeName", this.selectedTheme.name);
    formdata.append("imageDescription", this.ImageDescription);
    formdata.append("themeID", this.selectedTheme.id);
    var userid = parseInt(localStorage.getItem("UserId"));
    formdata.append("userID", userid.toString());

    this.service.Upload(formdata).subscribe(
      (data: boolean) => {

        this.isUploadLoading = false;
        if (data) {
          this.uploadvis = false;
          this.successvis = true;
          this.failvis = false;
        }
        else {
          this.uploadvis = false;
          this.successvis = false;
          this.failvis = true;
        }
      },
      (error: any) => {
        this.isUploadLoading = false;
        this.message.warning("网络发生异常 , 请重试！")
      }
    )
  }

  back() {
    this.uploadvis = true;
    this.successvis = false;
    this.failvis = false;
    this.selectedTheme = null;
    this.selectFile = null;
    this.ImageOverview = null;
    this.ImageDescription = null;
    this.ImageTime = null;
    this.needimgVisibility = false;
  }

  getAllTheme() {
    this.themeList = [];
    this.service.GetThemes(parseInt(localStorage.getItem("UserId"))).subscribe(
      (data: ThemeDto[]) => {
        if (data == null) {
          return;
        }
        data.forEach(element => {
          this.themeList.push({ name: element.ThemeName, id: element.ThemeID });
        });
        if (this.themeList.length == 0) {
          this.message.warning("系统中没有主题,请至少创建一个主题！")
        }
      }
    );
  }

}
