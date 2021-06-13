import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { TrainerPage } from './trainer.page';

const routes: Routes = [
  {
    path: '',
    component: TrainerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule],
  exports: [RouterModule],
})
export class TrainerPageRoutingModule {}
