import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThemeDto, UserDto, LienceDto, UserChangeDto, LicenseChangeDto,  } from './dto';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class Service {
  constructor(private http: HttpClient) { 
  }
  
  //angular 验证
  isLoginSuccess:boolean = false; 

  //webapi2  验证
  token:string = ""; 


  httpOptions= {headers: new HttpHeaders({})};

  baseUrl:string = "http://localhost:12351/api";


  //Login
  UserLogin(userDto:UserDto)
  {
    var url = this.baseUrl+ "/Login/user";
    return this.http.post(url,userDto);
  }

  VisitorLogin(lienceDto:LienceDto)
  {
    var url = this.baseUrl+ "/Login/visitor";
    return this.http.post(url,lienceDto);
  }

  Register(userDto:UserDto)
  {
    var url = this.baseUrl+ "/Login/register";
    return this.http.post(url,userDto);
  }

  //ShowImage
  DownloadOriginal(id:number)
  {
    var url = this.baseUrl+ "/ShowImage/image/Original/" + id;
    return this.http.get(url,{responseType: 'blob'});
  }

  DownloadSimple(id:number)
  {
    var url = this.baseUrl+ "/ShowImage/image/Simple/" + id;
    return this.http.get(url,{responseType: 'blob'});
  }

  GetThemes(id:number)
  {
    var url = this.baseUrl+ "/ShowImage/theme/" + id;
    return this.http.get(url);
  }

  GetImageInfos(themeID:number,year:number,month:number,userID:number)
  {
    var url = this.baseUrl+ "/ShowImage/images/" + themeID + "/"+year +"/"+ month + "/"+ userID;
    return this.http.get(url);
  }

  //SystemManagement
  Upload(fromData:FormData)
  {
    var url = this.baseUrl+ "/SystemManagement/image/";
    return this.http.post(url,fromData);
  }

  DeleteImage(id:number)
  {
    var url = this.baseUrl+ "/SystemManagement/image/id";
    return this.http.delete(url);
  }

  UserChange(userChangeDto:UserChangeDto)
  {
    var url = this.baseUrl+ "/SystemManagement/User";
    return this.http.put(url,userChangeDto);
  }

  LicenseChange(licenseChangeDto:LicenseChangeDto)
  {
    var url = this.baseUrl+ "/SystemManagement/license";
    return this.http.put(url,licenseChangeDto);
  }

  AddTheme(themeDto:ThemeDto)
  {
    var url = this.baseUrl+ "/SystemManagement/theme";
    return this.http.post(url,themeDto);
  }

  DeleteTheme(id:number)
  {
    var url = this.baseUrl+ "/SystemManagement/theme/" + id;
    return this.http.delete(url);
  }

  GetUserInfo(id:number)
  {
    var url = this.baseUrl+ "/SystemManagement/user/" + id;
    return this.http.get(url);
  }

}