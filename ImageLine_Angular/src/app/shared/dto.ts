import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expressionType } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}

export class ShowImageDto {
  ImageID:number;
  ImageOverview:string;
  ImageDescription:string;
  Year:number;
  Month:number;
}

export class UserDto {
   UserName: string;
   PassWord: string;
}

export class LienceDto {
   UserName: string;
   License: string;
}

export class LoginResultDto {
  UserID:number;
  IsSuccess:boolean;
  Reason:string;
  Token:string;
}


export class ThemeDto {
  ThemeID:number;
  UserID:number;
  ThemeName:string;
}
    

export class UserChangeDto {
  UserID:number;
  PassWord:string;
}

export class LicenseChangeDto {
  UserID:number;
  License:string;
}

export class UserInfoDto {
  Name:string;
  License:string;
}
