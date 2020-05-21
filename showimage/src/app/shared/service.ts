import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterDto, UserLoginDto, VisitorLoginDto } from './dto';

@Injectable()
export class Service {
  constructor(private http: HttpClient) { }

  baseUrl:string = "http://localhost:25169/api";

  //携带cookie
   options = ({ "withCredentials": true });
 
  SessionValidate()
  {
    var url = this.baseUrl+ "/Login/session";
    return this.http.get<boolean>(url,{ "withCredentials": true });
  }

  Register(registerDto:RegisterDto)
  {
    var url = this.baseUrl+ "/Login/register";
    return this.http.post<string>(url,registerDto);
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

}