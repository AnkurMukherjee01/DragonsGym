import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss'],
})
export class TrainerPage implements OnInit {
  Data=[{"name":"Diptendu Mona", "height":"6ft","weight":"70","achievement":"Won National Award","currentStatus":"Active"},{"name":"Bijoy", "height":"6ft","weight":"70","achievement":"Won National2 Award","currentStatus":"Active"},{"name":"Dipak", "height":"6ft","weight":"70","achievement":"Won National Award","currentStatus":"Active"}]
  constructor() { }

  ngOnInit() {
  }

}
