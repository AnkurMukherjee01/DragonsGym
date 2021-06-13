import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { AuthService } from './services/auth.service';
import { ServiceService } from './services/service.service';
import { Storage } from  '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [VideoPlayer,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService, ServiceService, Storage],
  bootstrap: [AppComponent],
})
export class AppModule {}
