import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingVedioPage } from './training-vedio.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingVedioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingVedioPageRoutingModule {}
