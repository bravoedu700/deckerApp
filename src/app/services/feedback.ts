import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class FeedbackProvider {

  subscribers: any[];

  constructor() {
    this.subscribers = [];
  }

  sendError(messageOnly = false) {
    console.log(messageOnly);

    //this.subscribers.forEach(sub => sub(messageOnly));
  }

  subscribe(f) {
    this.subscribers = []; // Allows to have only one subscriber at a time
    this.subscribers.push(f);
  }

}
