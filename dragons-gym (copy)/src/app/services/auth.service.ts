import { Injectable } from '@angular/core';

import { Storage } from  '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _storage: Storage | null = null;
  
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  setAccessToken(token){
    console.log(token)
    this.storage.set("ACCESS_TOKEN", token);
  }

  getAccessToken(){
    return this.storage.get("ACCESS_TOKEN");
  }
}
