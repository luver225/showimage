import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterDto, UserLoginDto, VisitorLoginDto } from './dto';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class Service {
  constructor(private http: HttpClient) { 
  }

  //angular  验证
  public isLoginSuccess:boolean = false; 

  //远程  验证
  public token:string = ""; 

  public httpOptions= {headers: new HttpHeaders({})};

  baseUrl:string = "http://localhost:25169/api";


  //login
  Register(registerDto:RegisterDto)
  {
    var url = this.baseUrl+ "/Login/register";
    return this.http.post<string>(url,registerDto,this.httpOptions);
  }

  UserLogin(userLoginDto:UserLoginDto)
  {
    var url = this.baseUrl+ "/Login/user";
    return this.http.post<string>(url,userLoginDto);
  }

  VisitorLogin(visitorLoginDto:VisitorLoginDto)
  {
    var url = this.baseUrl+ "/Login/visitor";
    return this.http.post<string>(url,visitorLoginDto);
  }



  //Manager
  UploadImage(formData:FormData)
  {
    var url = this.baseUrl+ "/ImageManagement/image";
    return this.http.post<boolean>(url,formData);
  }


  //showimage
  DownloadImage(id:number)
  {
    var url = this.baseUrl+ "/ImageManagement/image/" + id;
    return this.http.get(url,{responseType: 'blob'});
  }

}