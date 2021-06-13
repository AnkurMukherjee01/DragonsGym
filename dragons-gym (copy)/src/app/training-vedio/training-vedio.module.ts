import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingVedioPageRoutingModule } from './training-vedio-routing.module';

import { TrainingVedioPage } from './training-vedio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingVedioPageRoutingModule
  ],
  declarations: [TrainingVedioPage]
})
export class TrainingVedioPageModule {}
