import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginComponent } from './login/login.component';
import { ShowimageComponent } from './showimage/showimage.component';
import { ManagementComponent } from './management/management.component';
import { LogincheckComponent } from './login/logincheck/logincheck.component';
import { RegisterComponent } from './login/register/register.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { VistorComponent } from './login/vistor/vistor.component';
import { Service } from './shared/service';
;

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShowimageComponent,
    ManagementComponent,
    LogincheckComponent,
    RegisterComponent,
    ErrorpageComponent,
    VistorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [Service,{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
