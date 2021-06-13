import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainerPageRoutingModule } from './trainer-routing.module';

import { TrainerPage } from './trainer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainerPageRoutingModule
  ],
  declarations: [TrainerPage]
})
export class TrainerPageModule {
  Data=[{"name":"Diptendu Mona", "height":"6ft","weight":"70","Achievement":"Won National Award","Current Status":"Active"},{"name":"Bijoy", "height":"6ft","weight":"70","Achievement":"Won National2 Award","Current Status":"Active"},{"name":"Dipak", "height":"6ft","weight":"70","Achievement":"Won National Award","Current Status":"Active"}]
}
