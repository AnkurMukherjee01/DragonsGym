import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import * as WebVPPlugin from 'capacitor-video-player';
import { ApiService } from '../services/api.service';
const { CapacitorVideoPlayer, Device } = Plugins;

@Component({
  selector: 'app-training-vedio',
  templateUrl: './training-vedio.page.html',
  styleUrls: ['./training-vedio.page.scss'],
})
export class TrainingVedioPage implements OnInit {
  videoPlayer: any;
  private _videoPlayer: any;
  private _url: string;
  private _handlerPlay: any;
  private _handlerPause: any;
  private _handlerEnded: any;
  private _handlerReady: any;
  private _handlerExit: any;
  private _first: boolean = false;
  private _apiTimer1: any;
  private _apiTimer2: any;
  private _apiTimer3: any;
  private _testApi: boolean = true;
  private videos = [
    // {
    //   url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    //   subtitle: "Men in action 1",
    //   thumb: "assets/gym_thumbnail_1.jpg",
    //   title: "Training Video1"
    // },
    // {
    //   url: "https://drive.google.com/uc?export=download&id=1ukwiG6E0cfXG63cmk1AyCPi3fW9oFTbO",
    //   subtitle: "Men in action 2",
    //   thumb: "assets/gym_thumbnail_2.jpg",
    //   title: "Training Video 2"
    // }
  ]
  constructor(private apiService:ApiService) { }

  async ngOnInit() {
    this.apiService.getTable('resources').subscribe(
      data=>{
        
       // this.videos=JSON.parse(data["out"][0]).filter((o,i)=> i< Object.keys(data["out"][0]).length-3 && o["resource_type"].toLowerCase()=="video");
        console.log(this.videos)
        for (let i = 0; i < Object.keys(data["out"][0]).length-3; i++) {
          if(i<Object.keys(data["out"][0]).length-3 && data["out"][0][i]["resource_type"].toLowerCase()=="video")
          this.videos.push(data["out"][0][i]);
        }
        // this.groups=this.subscriptions.map(sub=>sub["type"]).filter((value, index, self) => self.indexOf(value) === index && value!='Registration')
        // this.subscribeList(this.groups[0])
        // this.presentAlert(this.subscriptions.filter(o=>o["type"]=='Registration'));
      }
    )
    // define the plugin to use
    const info = await Device.getInfo();
    if (info.platform === "ios" || info.platform === "android") {
      this._videoPlayer = CapacitorVideoPlayer;
    } else {
      this._videoPlayer = WebVPPlugin.CapacitorVideoPlayer
    }
    // define the video url
    this._url = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    // add listeners to the plugin
    this._addListenersToPlayerPlugin();
  }

  async play(url: string) {
    console.log(url)
    document.addEventListener('jeepCapVideoPlayerPlay', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerPlay ', e.detail) }, false);
    document.addEventListener('jeepCapVideoPlayerPause', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerPause ', e.detail) }, false);
    document.addEventListener('jeepCapVideoPlayerEnded', (e: CustomEvent) => { console.log('Event jeepCapVideoPlayerEnded ', e.detail) }, false);
    const res: any = await this.videoPlayer.initPlayer({ mode: "fullscreen", url: url });
  }

  async ionViewDidEnter(url) {

    const res: any = await this._videoPlayer.initPlayer(
      {
        mode: "fullscreen",
        url: url,
        playerId: "vplayer",
        componentTag: "my-page",
        subtitle:null
      })
      .then(() => { 

      }, (err)=>{JSON.stringify(err)});

  }
  private _addListenersToPlayerPlugin() {
    this._handlerPlay = this._videoPlayer.addListener('jeepCapVideoPlayerPlay', (data: any) => {
      console.log('Event jeepCapVideoPlayerPlay ', data);

    }, false);
    this._handlerPause = this._videoPlayer.addListener('jeepCapVideoPlayerPause', (data: any) => {
      console.log('Event jeepCapVideoPlayerPause ', data);

    }, false);
    this._handlerEnded = this._videoPlayer.addListener('jeepCapVideoPlayerEnded', async (data: any) => {
      console.log('Event jeepCapVideoPlayerEnded ', data);

    }, false);
    this._handlerExit = this._videoPlayer.addListener('jeepCapVideoPlayerExit', async (data: any) => {
      console.log('Event jeepCapVideoPlayerExit ', data)

    }, false);
    this._handlerReady = this._videoPlayer.addListener('jeepCapVideoPlayerReady', async (data: any) => {
      console.log('Event jeepCapVideoPlayerReady ', data)
      console.log("testVideoPlayerPlugin testAPI ", this._testApi);
      console.log("testVideoPlayerPlugin first ", this._first);
      if (this._testApi && this._first) {
        // test the API
        this._first = false;
        console.log("testVideoPlayerPlugin calling isPlaying ");
        const isPlaying = await this._videoPlayer.isPlaying({ playerId: "fullscreen" });
        console.log('const isPlaying ', isPlaying)
        this._apiTimer1 = setTimeout(async () => {
          const pause = await this._videoPlayer.pause({ playerId: "fullscreen" });
          console.log('const pause ', pause)
          const isPlaying = await this._videoPlayer.isPlaying({ playerId: "fullscreen" });
          console.log('const isPlaying after pause ', isPlaying)
          let currentTime = await this._videoPlayer.getCurrentTime({ playerId: "fullscreen" });
          console.log('const currentTime ', currentTime);
          let muted = await this._videoPlayer.getMuted({ playerId: "fullscreen" });
          console.log('initial muted ', muted);
          const setMuted = await this._videoPlayer.setMuted({ playerId: "fullscreen", muted: !muted.value });
          console.log('setMuted ', setMuted);
          muted = await this._videoPlayer.getMuted({ playerId: "fullscreen" });
          console.log('const muted ', muted);
          const duration = await this._videoPlayer.getDuration({ playerId: "fullscreen" });
          console.log("duration ", duration);
          // valid for movies havin a duration > 25
          const seektime = currentTime.value + 0.5 * duration.value < duration.value - 25 ? currentTime.value + 0.5 * duration.value
            : duration.value - 25;
          const setCurrentTime = await this._videoPlayer.setCurrentTime({ playerId: "fullscreen", seektime: (seektime) });
          console.log('const setCurrentTime ', setCurrentTime);
          const play = await this._videoPlayer.play({ playerId: "fullscreen" });
          console.log("play ", play);
          this._apiTimer2 = setTimeout(async () => {
            const setMuted = await this._videoPlayer.setMuted({ playerId: "fullscreen", muted: false });
            console.log('setMuted ', setMuted);
            const setVolume = await this._videoPlayer.setVolume({ playerId: "fullscreen", volume: 0.5 });
            console.log("setVolume ", setVolume);
            const volume = await this._videoPlayer.getVolume({ playerId: "fullscreen" });
            console.log("Volume ", volume);
            this._apiTimer3 = setTimeout(async () => {
              const pause = await this._videoPlayer.pause({ playerId: "fullscreen" });
              console.log('const pause ', pause);
              const duration = await this._videoPlayer.getDuration({ playerId: "fullscreen" });
              console.log("duration ", duration);
              const volume = await this._videoPlayer.setVolume({ playerId: "fullscreen", volume: 1.0 });
              console.log("Volume ", volume);
              const setCurrentTime = await this._videoPlayer.setCurrentTime({ playerId: "fullscreen", seektime: (duration.value - 3) });
              console.log('const setCurrentTime ', setCurrentTime);
              const play = await this._videoPlayer.play({ playerId: "fullscreen" });
              console.log('const play ', play);
            }, 10000);
          }, 10000);

        }, 5000);
      }
    }, false);

  }
}

