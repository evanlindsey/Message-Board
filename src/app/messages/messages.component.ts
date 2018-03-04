import { Component, OnInit } from '@angular/core';

import { MsgService } from '../shared/msg.service';

@Component({
  selector: 'app-messages',
  template: `
    <mat-card class="card">
      <h1>Messages</h1>
      <mat-card-content>
        <mat-input-container>
          <textarea [(ngModel)]="msg.message.text" matInput placeholder="Message"></textarea>
        </mat-input-container>
        <mat-card-actions>
          <button (click)="postMessage()" mat-button color="primary">POST</button>
        </mat-card-actions>
      </mat-card-content>
    </mat-card>
    <div *ngFor="let message of msg.messages | async">
      <mat-card class="card">
        <mat-card-title>{{message.user}}</mat-card-title>
        <mat-card-content>{{message.text}}</mat-card-content>
      </mat-card>
    </div>
  `
})
export class MessagesComponent implements OnInit {

  constructor(public msg: MsgService) { }

  ngOnInit() {
    this.msg.getMessages();
  }

  postMessage() {
    this.msg.postMessage();
  }

}
