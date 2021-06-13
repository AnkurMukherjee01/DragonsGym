import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../services/service.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  success: boolean = false;
  error: boolean= false
  constructor(private service: ServiceService, private authService : AuthService) { }

  ngOnInit() {
  }

  sendToken(email: string){
    this.service.postSendMailToken(email).subscribe(
      data => {
        this.success=true;
        this.authService.setAccessToken(data["out"]["token"])
      },
      err => {
            this.error =true;
            console.log('Error: ' + err.error);
            console.log('Name: ' + err.name);
            console.log('Message: ' + err.message);
            console.log('Status: ' + err.status);
          });
  }

}
