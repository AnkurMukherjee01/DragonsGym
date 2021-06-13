import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import {AuthServiceService} from '../../auth-service.service';
import {Router} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})

export class LoginPageModule {
  constructor(private  authService:  AuthServiceService, private  router:  Router) { }

  login(form){
    this.authService.login(form.value).subscribe((res)=>{
      this.router.navigateByUrl('home');
    });
  }
}
