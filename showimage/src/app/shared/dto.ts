import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expressionType } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}

export class RegisterDto {
  public UserName: String;
  public PassWord: String;
}

export class UserLoginDto {
  public UserName: String;
  public PassWord: String;
}

export class VisitorLoginDto {
  public UserName: String;
  public License: String;
}