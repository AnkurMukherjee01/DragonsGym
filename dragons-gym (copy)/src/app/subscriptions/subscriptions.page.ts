import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements OnInit {

  constructor(private apiService:ApiService, private alertController:AlertController) { }

  async presentAlert(registrationDetails) {
    const alert = await this.alertController.create({
      cssClass: 'registration',
     // header: registrationDetails[0]['plan_name'],
      message: '<div class="message-color">'+registrationDetails[0]['duration']+' '+registrationDetails[0]['plan_name'] +' fee '+registrationDetails[0]['price']+ ' will be added with first time payment</div>',
      buttons: [{text:'OK',cssClass: 'alert-button'}]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  subscriptions=[]
  groups=[]
  activeButton;
  subscriptionFilter=[];
  ngOnInit() {
    this.apiService.getTable('Subscription').subscribe(
      data=>{
        for (let i = 0; i < 9; i++) {
          console.log(data["out"][0][i])
          this.subscriptions.push(data["out"][0][i]);
        }
        this.groups=this.subscriptions.map(sub=>sub["type"]).filter((value, index, self) => self.indexOf(value) === index && value!='Registration')
        this.subscribeList(this.groups[0])
        this.presentAlert(this.subscriptions.filter(o=>o["type"]=='Registration'));
      }
    )
  }

  subscribeList(group){
    this.activeButton=group;
    this.subscriptionFilter=this.subscriptions.filter(o=>o["type"]==group);
  }
}
