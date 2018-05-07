import { Component, OnInit } from '@angular/core';

import { MsgService } from '../services/msg.service';

@Component({
  selector: 'app-messages',
  template: `
    <mat-card class="card">
      <h1>Messages</h1>
      <mat-card-content>
        <div class="field-container">
          <mat-form-field>
            <textarea [(ngModel)]="msg.message.text" matInput placeholder="Message"></textarea>
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="postMessage()">POST</button>
        </div>
      </mat-card-content>
    </mat-card>
    <div *ngFor="let message of msg.messages | async">
      <br />
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
